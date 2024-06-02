// // const http = require('http');
// // http.createServer((req,res)=>{
// //     // res.writeHead(200, { 'Content-Type': 'text/plain' });

// //     res.writeHead(200,{'Content-Type': 'text/plain' });
// //     res.end("{message:'dfata'}")
// // }).listen(3000)

// const express = require('express');
// const app = express();

// app.get('/', slowRoute);
// app.get('/fast', fastRoute);

// function slowRoute(req, res) {
//   loop();
//   allocate();
//   setTimeout(() => res.send('Success'), 100);
// }

// function fastRoute(req, res) {
//   res.send('Success');
// }

// function loop() {
//   for (let i = 0; i <= 1e8; i++) {}
// }

// function allocate() {
//   const items = [];

//   for (let i = 0; i < 1e6; i++) {
// 	items.push({ count: i });
//   }
// }

// app.listen(3030, 'localhost', () => console.log(`Listening on localhost:3030`));