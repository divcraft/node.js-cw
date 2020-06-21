// operatory obsługujące bazę danych mongoDB:
// baza danych zawiara kolekcje które zawierają obiekty: db.cars, db.clients, itp.

// bazę danych nalezy uruchomić wpisując w wierszu poleceń ścieżkę
// cd "c:/Program Files/MongoDB/Server/4.2/bin" (ścieżka do programu)
// uruchamiamy plik mongo.exe

// ------

// METODOLOGIA CRUD - CREATE, READ, UPDATE, DELETE

//       CREATE:

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

//       READ:

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

// wyszukanie obiektów zawierających właściwość 'age' o wartości 21 lub właściwości 'name' o wartości 'Jan':
// db.clients.find({$or: [{age: 21}, {name: 'Jan'}]})


// wyszukanie wszystkich obiektów poza tymi zawierającymi właściwość 'age' o wartości 21}:
// db.clients.find({$not: {age: 21}})

//       UPDATE:

// db.clients.update({}, {active: true})
// update() zawira dwa argumenty, pierwszy wyszukuje obiekty do zmienienia (pusty obiekt wyszuka wszystko), drugi podaje wartości które będą poddane zmianie
// update() zmienia zawsze tylko jeden, pierwszy wyszukany obiekt z kolekcji oraz nadpisuje cały obiekt właściwościami podanymi w argumencie drugim

// aby uniknąć utraty własciwości obiektów niepodlegających zmianie należy użyć selektor $set: i w nim podać właściwości które chcemy nadpisac lub dodać:
// db.clients.update({name: 'Anna'}, {$set: {active: true}})

// aby za pomocą metody udpate() zmienić wszystkie wyszukane obiekty, nie tylko pierwszy, należy jako trzeci argument zamieścić obiekt z ustawieniami i podać do niego właściwość multi: true
// db.clients.update({name: 'Anna'}, {$set: {active: true}}, {multi: true})

// alternatywnie, żeby nie podawać trzeciego atrybutu z ustawieniami dla wielu zmian, można skorzystać z metod updateOne() lub updateMany(), pozostałe dwa aargumenty zamieszcza się tak samo jak przy update():
// db.clients.updateOne({name: 'Anna'}, {$set: {active: true}})
// db.clients.updateMany({name: 'Anna'}, {$set: {active: true}})

//       DELETE:

// obiekty usuwa się metodami deleteOne() oraz deleteMany() podając jako argument selektor obiektu lub obiektów do usunięcia:
// db.clients.deleteOne({_id: ObjectId("507f1f77bcf86cd799439011")}) - usuwa użytkownika o wskazanym ID
// w przypadku gdy do selektora deleteOne() pasuje więcej obiektów, usunięty zostanie ten wyszukany jako pierwszy
// db.clients.deleteMany({age: {$lt: 18}}) - usuwa użytkowników o wieku mniejszym niż 18 lat