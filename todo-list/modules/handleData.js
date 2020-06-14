const fs = require('fs')
const colors = require('colors')

const handleData = (type, title = null) => {

   let tasks = fs.readFileSync('data/tasks.json', 'utf8')
   tasks = JSON.parse(tasks)
   const hasThisTask = tasks.find(task => task.title === title) ? true : false

   if (type === 'add') {
      if (hasThisTask) {
         return console.log('to zadanie już zostało wprowadzone!'.red)
      } else {
         const id = tasks[tasks.length - 1].id + 1
         let newList = [...tasks, { id, title }]
         newList = JSON.stringify(newList)
         fs.writeFileSync('data/tasks.json', newList)

         console.log(`dodano nowe zadanie: ${title}`)
      }
   } else if (type === 'remove') {
      if (hasThisTask) {
         let newList = tasks.filter(task => task.title !== title)
         newList = JSON.stringify(newList)
         fs.writeFileSync('data/tasks.json', newList)

         console.log(`zadanie '${title}' dostało usunięte z listy`)
      } else {
         return console.log('takiego zadania nie ma na liście!'.red)
      }
      console.log('remove')
   } else if (type === 'list') {
      console.log(`dostępne zadania:`.red.bgWhite)
      tasks.forEach((item, index) => {
         index % 2 ? console.log(item.title.blue) : console.log(item.title.yellow)
      })
   }
}

module.exports = handleData