const answerButtons = document.querySelectorAll('.answer-button')
const lifelineButtons = document.querySelectorAll('.lifeline-button')
const friendAnswerField = document.querySelector('#lifeline-answer')
const counter = document.querySelector('#gained-points')

const getCookie = (name) => {
   const value = `; ${document.cookie}`;
   const parts = value.split(`; ${name}=`);
   if (parts.length === 2) return parts.pop().split(';').shift();
}

const isPhoneAFriendUsed = getCookie('isPhoneAFriendUsed')
const isFiftyFiftyUsed = getCookie('isFiftyFiftyUsed')
const isAskTheAudienceUsed = getCookie('isAskTheAudienceUsed')
const answeredQuestions = getCookie('correctAnswersCounter') || 0

answerButtons.forEach(button => button.addEventListener('click', () => sendAnswer(button)))
lifelineButtons.forEach(button => button.addEventListener('click', () => getLifeline(button)))
counter.innerText = answeredQuestions

if (isPhoneAFriendUsed) lifelineButtons[0].setAttribute('disabled', true)
if (isFiftyFiftyUsed) lifelineButtons[1].setAttribute('disabled', true)
if (isAskTheAudienceUsed) lifelineButtons[2].setAttribute('disabled', true)

const fetchNewQuestion = () => {
   fetch('/question', { method: 'GET' })
      .then(response => response.json())
      .then(data => fillNewQuestion(data))
}

const fillNewQuestion = ({ question, answers }) => {
   if (friendAnswerField.innerText) friendAnswerField.innerText = ''
   answerButtons.forEach(answerButton => {
      const isDisabled = answerButton.getAttribute('disabled')
      if (isDisabled) answerButton.removeAttribute('disabled')
   })
   const questionField = document.querySelector('#question')
   questionField.innerText = question
   for (index in answers) {
      answerButtons[index].innerText = answers[index]
   }
}

const sendAnswer = (button) => {
   fetch(`/answer/${button.innerText}`, { method: 'POST' })
      .then(response => response.json())
      .then(data => chceckAnswer(data))
}

const chceckAnswer = ({ answeredCorrect, correctAnswersCounter, isWinner }) => {
   if (answeredCorrect) {
      console.log('poprawnie!')

      counter.innerText = correctAnswersCounter
      if (isWinner) {
         endGame(isWinner)
      } else {
         fetchNewQuestion()
      }
   } else {
      console.log('niepoprawnie!')
      endGame(isWinner)
   }
}

const endGame = (isWinner) => {
   const mainContainer = document.querySelector('#main-container')
   mainContainer.innerHTML = isWinner ? '<h1>Wygrana!</h1>' : '<h1>Przegrana!</h1>'
}

const getLifeline = (button) => {
   let apiLink = `/help/${button.id}`
   fetch(apiLink, { method: 'GET' })
      .then(response => response.json())
      .then(data => showLifeline(button, data))
}

const showLifeline = (button, data) => {
   if (button.id === 'phone-a-friend') {

      const { friendAnswer } = data
      friendAnswerField.innerText = friendAnswer
   } else if (button.id === 'fifty-fifty') {

      const { answersToRemove } = data
      answerButtons.forEach(answerButton => {
         answersToRemove.forEach(item => {
            if (item === answerButton.innerText) answerButton.setAttribute('disabled', true)
         })
      })
   } else if (button.id === 'ask-the-audience') {
      const { charts } = data
      friendAnswerField.innerHTML = `
      <div>Odpowiedzi publiczności:</div>
      <br>
      <div>${answerButtons[0].innerText}: ${charts[0]}%</div>
      <div>${answerButtons[1].innerText}: ${charts[1]}%</div>
      <div>${answerButtons[2].innerText}: ${charts[2]}%</div>
      <div>${answerButtons[3].innerText}: ${charts[3]}%</div>
      `
   }
   button.setAttribute('disabled', true)
}

fetchNewQuestion()
