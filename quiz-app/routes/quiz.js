const quiz = (app) => {

   const questions = [
      {
         question: 'Jakim językiem posługują się Meksykanie?',
         answers: ['Hiszpańskim', 'Francuskim', 'Portugalskim', 'Angielskim'],
         correctAnswer: 'Hiszpańskim'
      },
      {
         question: 'Który kraj z niżej wymienionych posiada największą populację?',
         answers: ['Stany Zjednoczone', 'Indie', 'Rosja', 'Brazylia'],
         correctAnswer: 'Indie'
      },
      {
         question: 'Gdzie znajduje się Ankara?',
         answers: ['W Europie', 'W Afryce', 'W Azji', 'W Australii'],
         correctAnswer: 'W Azji'
      },
      {
         question: 'Ilu ludzi mieszka w Szczecinie?',
         answers: ['100 tys', '1 mln', '600 tys', '400 tys'],
         correctAnswer: '400 tys'
      }
   ]

   let correctAnswersCounter = 0

   app.get('/question', (req, res) => {
      correctAnswersCounter = Number(req.cookies.correctAnswersCounter) || 0
      const nextQuestion = questions[correctAnswersCounter] // wydziela z tablicy pytań następne pytanie które należy zadać
      const { question, answers } = nextQuestion

      res.json({
         question,
         answers,
      })

   })

   app.post('/answer/:pickedAnswer', (req, res) => {
      const currentQuestion = questions[correctAnswersCounter]
      const { correctAnswer } = currentQuestion
      const { pickedAnswer } = req.params

      if (pickedAnswer == correctAnswer) {
         console.log('poprawna odpowiedź!')
         correctAnswersCounter++
         res.cookie('correctAnswersCounter', correctAnswersCounter)
         const isWinner = correctAnswersCounter === questions.length ? true : false
         if (isWinner) {
            res.clearCookie('correctAnswersCounter')
            res.clearCookie('isPhoneAFriendUsed')
            res.clearCookie('isFiftyFiftyUsed')
            res.clearCookie('isAskTheAudienceUsed')
            correctAnswersCounter = 0
         }
         res.json({
            answeredCorrect: true,
            correctAnswersCounter,
            isWinner
         })
      } else {
         console.log('zła odpowiedź!')
         res.clearCookie('correctAnswersCounter')
         res.clearCookie('isPhoneAFriendUsed')
         res.clearCookie('isFiftyFiftyUsed')
         res.clearCookie('isAskTheAudienceUsed')
         correctAnswersCounter = 0
         res.json({
            answeredCorrect: false,
         })
      }
   })

   app.get('/help/:lifeline', (req, res) => {

      const { lifeline } = req.params
      const currentQuestion = questions[correctAnswersCounter]
      const { answers, correctAnswer } = currentQuestion

      if (lifeline === 'phone-a-friend') {
         const friendAnswer = Math.random() > 0.2 ? `Wydaje mi się, że poprawna odpowiedź to: ${correctAnswer}` : 'Nie mam zielonego pojęcia...'
         res.cookie('isPhoneAFriendUsed', true)
         res.json({
            friendAnswer,
         })
      } else if (lifeline === 'fifty-fifty') {
         const answersToRemove = answers.filter(answer => answer !== correctAnswer)
         answersToRemove.splice(Math.floor(Math.random() * answersToRemove.length), 1)
         res.cookie('isFiftyFiftyUsed', true)
         res.json({
            answersToRemove,
         })
      } else if (lifeline === 'ask-the-audience') {
         const charts = [10, 20, 30, 40]
         const goodAnswerIndex = answers.findIndex(answer => answer === correctAnswer)
         const chartsLastIndex = charts.length - 1
         for (let i = chartsLastIndex; i > 0; i--) {
            const change = Math.floor(Math.random() * 16 - 8)
            charts[i] += change
            charts[i - 1] -= change
         }
         charts.splice(goodAnswerIndex, 0, charts[chartsLastIndex])
         charts.splice(charts.length, 1)
         res.cookie('isAskTheAudienceUsed', true)
         res.json({
            charts,
         })
      }
   })
}

module.exports = quiz