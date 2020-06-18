const buttons = document.querySelectorAll('button')

buttons.forEach(button => {
   button.addEventListener('click', () => postAnswer(button))
})

const getNewQuestion = () => {
   fetch('/question', { method: 'GET' })
      .then(response => response.json())
      .then(data => fillNewQuestion(data))
}

const fillNewQuestion = ({ question, answers }) => {
   const questionField = document.querySelector('#question')
   questionField.innerText = question
   for (index in answers) {
      buttons[index].innerText = answers[index]
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

getNewQuestion()