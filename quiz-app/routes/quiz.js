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
         const isWinner = correctAnswersCounter === questions.length ? true : false
         res.json({
            answeredCorrect: true,
            correctAnswersCounter,
            isWinner
         })
      } else {
         console.log('zła odpowiedź!')
         res.json({
            answeredCorrect: false,
         })
      }
   })

}

module.exports = quiz