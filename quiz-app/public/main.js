const buttons = document.querySelectorAll('button')

const fetchNewQuestion = () => {

   fetch('/question', {
      method: 'GET'
   })
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

buttons.forEach(button => {
   button.addEventListener('click', () => sendAnswer(button))
})

const sendAnswer = (button) => {

   fetch(`/answer/${button.innerText}`, {
      method: 'POST'
   })
      .then(response => response.json())
      .then(data => chceckAnswer(data))

}

const chceckAnswer = ({ answeredCorrect, correctAnswersCounter }) => {

   if (answeredCorrect) {
      console.log('poprawnie!')
      const counter = document.querySelector('#gained-points')
      counter.innerText = correctAnswersCounter
      fetchNewQuestion()
   } else {
      console.log('niepoprawnie!')
   }

}

fetchNewQuestion()