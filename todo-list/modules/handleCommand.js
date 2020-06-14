const colors = require('colors')

const handleData = require('./handleData')

const handleCommand = ({ add, remove, list }) => {
   if (add) {
      if (typeof add !== 'string') {
         return console.log('argument musi być tekstem'.red)
      } else if (add.length < 7) {
         return console.log('argument zawiarać min. 7 znaków'.red)
      }
      handleData('add', add)
   } else if (remove) {
      if (typeof remove !== 'string') {
         return console.log('argument musi być tekstem'.red)
      } else if (remove.length < 7) {
         return console.log('argument zawiarać min. 7 znaków'.red)
      }
      handleData('remove', remove)
   } else if (list || list === '') {
      handleData('list')
   } else {
      console.log('błędne polecenie'.red)
   }
}

module.exports = handleCommand