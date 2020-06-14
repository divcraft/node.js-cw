const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((request, response) => {
   let url
   console.log(request.url)
   switch (request.url) {
      case '/':
         response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
         url = path.join(__dirname, 'files/index.html')
         break
      case '/about':
         response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
         url = path.join(__dirname, 'files/about.html')
         break
      case '/api/users':
         response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
         url = path.join(__dirname, 'files/data.json')
         break
      case '/main.js':
         response.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' })
         url = path.join(__dirname, 'files/main.js')
         break
      default:
         response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
         url = path.join(__dirname, 'files/404.html')
   }
   fs.readFile(url, (err, page) => {
      if (err) {
         response.end('<h1>Error 404</h1>')
      } else {
         response.end(page)
      }
   })
})

server.listen(4500, 'localhost', () => console.log('serwer w trybie nasłuchiwania'))