// operatory obsługujące bazę danych mongoDB:
// baza danych zawiara kolekcje które zawierają obiekty: db.cars, db.clients, itp.

// bazę danych nalezy uruchomić wpisując w wierszu poleceń ścieżkę
// cd "c:/Program Files/MongoDB/Server/4.2/bin" (ścieżka do programu)
// uruchamiamy plik mongo.exe


// dodawanie pojenyńczego obiektu:
// db.clients.insertOne({name: 'Anna', surname: 'Wiśniewska', age: 32})
// każdy nowy obiekt dostaje ID pod zmienną _id

// dodawanie wielu obiektów (wykorzystanie tablicy):
// db.clients.insertMany([
//    {
//       name: 'Anna', 
//       surname: 'Wiśniewska', 
//       age: 32
//    },
//    {
//       name: 'Marek', 
//       surname: 'Adamczyk', 
//       age: 41
//    },
// ])

// wyszukanie wszystkich obiektów z kolekcji:
// db.clients.find()

// wyszukanie obiektów po ID (id należy podać jakby był argumentem funkcji ObjectId()):
// db.clients.find({_id: ObjectId("507f1f77bcf86cd799439011")})

// wyszukanie obiektów po właściwości name:
// db.clients.find({name: 'Marek'})

// wyszukanie obiektów po dwóch właściwościach:
// db.clients.find({name: 'Marek', age: 41})

// wyszukanie obiektów o właściwości 'age' większe niż 40 ($gt - greater than):
// db.clients.find({age: {$gt: 40}})

// wyszukanie obiektów o właściwości 'age' większe lub równe 40 ($gte - greater than, equal):
// db.clients.find({age: {$gte: 40}})

// wyszukanie obiektów o właściwości 'age' mniejsze niż 40 ($lt - less than):
// db.clients.find({age: {$lt: 40}})

// wyszukanie obiektów o właściwości 'age' większe lub równe 40 ($lte - less than, equal):
// db.clients.find({age: {$lte: 40}})

// wyszukanie obiektów o właściwości 'age' większe od 40 i mniejsze od 50:
// db.clients.find({age: {$gt: 40, $lt: 50}})

// wyszukanie obiektów o właściwości 'age' zawierającej wartość 21, 31 lub 41:
// db.clients.find({age: {$in: [21, 31, 41]}})

// wyszukanie obiektów o właściwości 'age' niezawierającej wartości 21, 31 ani 41 ($nin - not in):
// db.clients.find({age: {$nin: [21, 31, 41]}})



