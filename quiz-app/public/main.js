const answerButtons = document.querySelectorAll('.answer-button')
const lifelineButtons = document.querySelectorAll('.lifeline-button')
const friendAnswerField = document.querySelector('#lifeline-answer')

answerButtons.forEach(button => button.addEventListener('click', () => postAnswer(button)))
lifelineButtons.forEach(button => button.addEventListener('click', () => getLifeline(button)))

const getNewQuestion = () => {
   fetch('/question', { method: 'GET' })
      .then(response => response.json())
      .then(data => fillNewQuestion(data))
}

const fillNewQuestion = ({ question, answers }) => {
   if (friendAnswerField.innerText) friendAnswerField.innerText = ''
   const questionField = document.querySelector('#question')
   questionField.innerText = question
   for (index in answers) {
      answerButtons[index].innerText = answers[index]
   }
}

const postAnswer = (button) => {
   fetch(`/answer/${button.innerText}`, { method: 'POST' })
      .then(response => response.json())
      .then(data => chceckAnswer(data))
}

const chceckAnswer = ({ answeredCorrect, correctAnswersCounter, isWinner }) => {
   if (answeredCorrect) {
      console.log('poprawnie!')
      const counter = document.querySelector('#gained-points')
      counter.innerText = correctAnswersCounter
      if (isWinner) {
         endGame(isWinner)
      } else {
         getNewQuestion()
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
      friendAnswerField.innerText = data.friendAnswer
   } else if (button.id === 'fifty-fifty') {
      console.log(data)
   } else if (button.id === 'ask-the-audience') {
      console.log(data)
   }
   // button.setAttribute('disabled', true)
}

getNewQuestion()