// strukturę projektu należy budować tak samo jak to jest podane na obrazku catalog-structure
// w celu stworzenia takiego szkieletu można uzyć bibliotekę express-generator
// musi być ona zainstalowana globalnie komendą npm install express-generator -g
// do wygenerowania szkieletu służy komenda express nazwa-folderu --no-view --git
// flaga --no-view mówi o tym, że w tym projekcie silnik widoku nie jest używany 
// flaga --git wygeneruje plik .gitignore



const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser') // wymaga npm install cookie-parser

const app = express()

app.listen(3000, 'localhost', () => {
   console.log('Server http://localhost:3000 is listening...')
})



// MIDDLEWARES:

// middlewares wywołuje się podając je jako argument dla metody use() naszej aplikacji
// należy je wywoływać przed zdefiniowaniem ścieżek aplikacji 
app.use(express.json()) // automatycznie parsuje wszystkie wysłane przez klienta pliki json wysłane jako req.body na obiekty
app.use(express.static(path.join(__dirname, 'static'))) // pozwala serwerowi automatycznie wyszukiwać statyczne pliki bez konieczności definiowania każdej ścieżki osobno, jako argument nalezy podać ścieżkę w której znajdują się pliki statyczne i potem do niej się odnosić
app.use(cookieParser()) // automatycznie parsuje ciasteczka z json na obiekt, wymaga biblioteki cookie-parser



// NASŁUCHIWANIE NA STRONĘ GŁÓWNĄ:

app.get('/', () => {
   console.log('Hello, backend!')
})



// ODBIERANIE OBIEKTU ZAPYTANIA PRZY METODZIE POST:

// przy wywołaniu po stronie klienta następującej funkcji:
// fetch('/get-api', {
//    method: 'POST',
//     headers: {
//      'Content-Type': 'application/json'
//    },
//     body: JSON.stringify({
//      name: 'imię',
//        surname: 'nazwisko'
//    })
//  })
// nasłuchując na metodę post serwer otrzyma obiekt body zawierający wymagane dane:
app.post('/get-api', (req, res) => {
   console.log(req.body)
   console.log(req.cookies)
})



// WŁAŚCIWOŚCI I METODY OBIEKTU REQUEST:

app.all('/request', (req) => {
   console.log('REQUEST PROPERTIES:')
   console.log('nazwa hosta:', req.hostname) // nazwa serwera na którym jest aplikacja
   console.log('medota http:', req.method) // metoda http, domyślnie GET
   console.log('IP urządzenia klienta:', req.ip) // IP urzadzenia klienta
   console.log('tablica IP urządzeń jeśli są proxy:', req.ips) // tablica IP urządzeń w przypadku korzystania z proxy
   console.log('właściwość "url" ścieżki:', req.url) // właściwość ścieżki url
   console.log('właściwość "path" ścieżki:', req.path) // następna właściwość ścieżki url
   console.log('oryginalny "url" w przypadku przekierowania:', req.originalUrl) // ścieżka oryginalna url w przypadku przekierowania 
   console.log('typ protokołu:', req.protocol) // typ protokołu, np. 'http' 'https'
   console.log('protokół jest szyfrowany:', req.secure) // sprawdza czy protokół jest szyfrowany: true/false
   console.log(req.get('Referer')) // zwraca adres strony z której klient wszedł na naszą stronę
   console.log('obiekt z zapytaniami query:')
   console.log(req.query) // zwraca obiekt z wartościami zapytań
   // localhost:3000/request?name=Tomasz&surname=Ogonowski zwraca obiekt { name: 'Tomasz', surname: 'Ogonowski' }
})



// WŁAŚCIWOŚCI I METODY OBIEKTU RESPONSE:

app.get('/send', (req, res) => {
   res.send('Hello, response')
   // metoda łączy w sobie metody res.write() i res.end(), uzupełnia response head o dane Content-Type i Content-length oraz automatycznie wykrywa typ odpowiedzi (text/html, application/javascript, itp)
   // do przesyłania plikow JSON sugerowana metoda json()
})

app.get('/json', (req, res) => {
   res.json({ id: 1, name: 'Jan' })
   // używane jak send() ale do przekazywania plików JSON, rekomendowane
})

app.get('/location', (req, res) => {
   // przekierowywuje stronę na inny adres
   console.log('status 302, wysłanie na stronę google.com')
   res.location('https://google.com')
   res.sendStatus(302) //sendStatus() wymagane do zakończenia połaczenia z serwerem
   // w przypadku przypisania statusu 301 (przekierowanie trwałe) nawet przy późniejszej zmianie statusu, klienci którzy już wcześniej odwiedzili stronę przy ponownym wejściu będą nadal przekierowywani na wcześniej podany adres (przeglądarka to zapamiętuje)
   // sugerowane korzystanie z metody redirect()
})

app.get('/redirect', (req, res) => {
   // przekierowywuje stronę na inny adres
   console.log('status 302, wysłanie na stronę google.com')
   res.redirect('https://google.com', 302)
   // jeśli nie poda się drugiego argumentu domyślnie zostanie przypisany status 302 (przekierowanie tymczasowe)
   // jako pierwszy argument można podać wartości '..' żeby wrocić do ścieżki powyżej albo 'back' żeby wrócić do poprzedniej strony; jeśli nie ma poprzedniej strony (link został wklejony lub wpisany ręcznie) to nastąpi przekierowanie na strone główną
})



// PRZESYŁANIE PLIKÓW:

app.get('/send-file', (req, res) => {
   const folderPath = path.join(__dirname, 'static')
   res.sendFile('image.html', {
      root: folderPath, // wskazuje na ścieżkę katalogu z plikiem i zabezpiecza przed przeglądaniem innych katalogów przez klienta, zalecane stosowanie zawsze
      lastModified: true, // ustawione false ukrywa ostatnią modyfikację pliku, domyślnie ustawione oraz zalecane na true
      headers: null, // pozwala nadać dodatkowe nagłówki dla response
      dotfiles: 'allow', // mówi czy można pobierać pliki z kropką na początku nazwy, np. .gitignore (allow, deny, ignore (zazwyczaj używane są allow lub ignore, deny niezalecane))
   })
})

app.get('/image.jpg', (req, res) => {
   res.sendFile('image.jpg', {
      root: path.join(__dirname, 'static')
   })
})

app.get('/attachment', (req, res) => {
   res.attachment(path.join(__dirname, 'static/document.pdf'))
   res.end() // wymagane do zakończenia odpowiedzi serwera
})

app.get('/download', (req, res) => {
   //połączenie metod sendFile() i attachment(), pozwala zmienić nazwę pobranego pliku (drugi argument) oraz nadać obiekt z ustawieniami odpowiedzi (trzeci argument (właściwość root tutaj nie działa, należy pominąć))
   res.download(path.join(__dirname, 'static/document.pdf'), 'new-filename.pdf')
   //nie wymaga end() do zakończenia odpowiedzi serwera
})



// NADANIE NAGŁÓWKA (HEADERS) DLA ODPOWIEDZI SERWERA:

app.get('/set', (req, res) => {
   res.set('Content-Type', 'text/plain')
   // żeby ustawić więcej nagłówków należy jako argument podać obiekt:
   // res.set({
   //    'Content-Type': 'image/png',
   //    'Content-length': '730'
   // })
   res.end()
})

app.get('/headers-sent', (req, res) => {
   // ta właściwość zwraca informację o tym czy nagłówek został już wysłany
   console.log(res.headersSent)
   res.send('<h1>Some content</h1>')
   console.log(res.headersSent)
   // nagłówek zostanie automatycznie nadany przed wywołaniem treści odpowiedzi (send(), json(), sendFile(), itp.) jesli nie zostanie nadany metodą set(), a nie mogą zostać wysłane dwa nagłówki więc ta właściwość pozwala to określić
   if (res.headersSent) {
      console.log('nagłówek nadany')
   } else {
      console.log('nie ma nagłówka')
   }
   res.end()
})



// USTAWIANIE I USUWANIE CIASTECZEK:

app.get('/cookie', (req, res) => {
   const date = new Date()
   date.setMonth(date.getMonth() + 1) // zmiana daty na za miesiąc

   res.cookie('cookie_name', 'cookie_value', {
      domain: 'localhost', // domena do której będą wysyłane ciastka
      expires: date, // czas do kiedy ciastko ma być zapamiętane, domyślnie jest to czas trwanie sesji przeglądarki
      // maxAge: 5 * 60 * 1000, // min * sek * ms - pozwala podać wartość w minutach, określa jak długo ma istnieć ciastko od momentu utworzenia w milisekundach (należy wybrać expires albo maxAge)
      httpOnly: false // ustawione na true sprawia, że po stronie klienta nie ma dostępu do tego ciastka (przydatne przy danych logowania, danych bankowych, itp.)
   })
   res.cookie('second_cookie', 'second_value')

   res.end()
})

app.get('/clear-cookie', (req, res) => {
   res.clearCookie('cookie_name')
   // pozwala usuwać cookies, przydatne np przy wylogowaniu użytkownika żeby usunąć jego dane 
   res.end()
})



// NADAWANIE PARAMETRÓW DLA LINKU URL:

app.get('/:first-param/:sec-param?', (req) => {
   console.log(req.params) // zapytanie o parametry zapytań
   // dla linku http://localhost:3000/Jan/Szczecin zwroci obiekt { first-param: 'Jan', sec-param: 'Szczecin' }
   //znak ? na końcu parametru informuje serwer o tym, że jest to parametr opcjonalny
   //ścieżki ze zmiennymi parametrami nalezy dodawać pod ścieżkami z parametrami stałymi żeby express najpierw sprawdził czy posiada już podaną ścieżkę jako parametr stały
   // np. http://localhost:3000/:name/:city? - parametr city nie jest wymagany
})