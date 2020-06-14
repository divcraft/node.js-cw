console.log('działa')

setTimeout(() => {
   const title = document.querySelector('h1')
   const links = document.querySelectorAll('a')
   title.style.color = 'navy'
   links.forEach(link => link.style.color = 'navy')
}, 2000);