const mongodb = require('mongodb')

const client = mongodb.MongoClient('mongodb://localhost:27017', {
   useNewUrlParser: true,
   // useUnifiedTopology: true
})

// nie mylić obiektu klienta bazy danych 'client' z nazwą jednej z kolekcji 'clients'

client.connect(err => {
   if (err) {
      console.log('Błąd z połączeniem do MongoDB:', err)
   } else {
      console.log('Połączono z MongoDB')

      const test = client.db('test') // nazwa bazy danych jako argument
      const clients = test.collection('clients') // połączenie z kolekcją 'clients'

      // operacje mongodb w node.js

      // // dodawanie jednego obiektu:
      // clients.insertOne({ 
      //    name: 'Józef',
      //    surname: 'Staszak',
      //    age: 55
      // })

      // // dodawanie wielu obiektów:
      // clients.insertMany([ 
      //    {
      //       name: 'Marek',
      //       surname: 'Jakubowski',
      //       age: 40
      //    },
      //    {
      //       name: 'Adrianna',
      //       surname: 'Górzyńska',
      //       age: 36
      //    }
      // ])

      // // usuwanie jednego obiektu:
      // clients.deleteOne({_id: mongodb.ObjectID('5eef5ee221d73d28a0536c6a')})

      // // aktualizacja danych
      // // dane aktualizują się asynchronicznie, można więc w związku z tym jako trzeci parametr funkcji dodać callback informujący o tym kiedy funkcja się wykonała i z jakim skutkiem:
      // clients.updateMany({
      //    age: { $gte: 18 }
      // },
      //    {
      //       $set: {
      //          isAdult: true
      //       }
      //    }, (err) => {
      //       if (err) {
      //          console.log('Nie udało się aktualizować kolekcji', err)
      //       } else {
      //          console.log('Dodano właściwość dla osób pełnoletnich')
      //       }
      //    })

      // clients.updateMany({
      //    age: { $lt: 18 }
      // },
      //    {
      //       $set: {
      //          isAdult: false
      //       }
      //    }, (err) => {
      //       if (err) {
      //          console.log('Nie udało się aktualizować kolekcji', err)
      //       } else {
      //          console.log('Dodano właściwość dla osób niepełnoletnich')
      //       }
      //    })

      // // wyświetlanie kolekcji w formie tablicy:
      // clients.find({ age: { $gte: 40 } }).toArray((err, clientsArray) => {
      //    if (err) {
      //       console.log('Nie udało się odtworzyć tablicy:', err)
      //    } else {
      //       console.log(clientsArray)
      //    }
      // })

      clients.find({}).toArray((err, clientsArray) => {
         if (err) {
            console.log('Nie udało się odtworzyć tablicy:', err)
         } else {
            console.log(clientsArray)
         }
      })

      client.close()
   }
})