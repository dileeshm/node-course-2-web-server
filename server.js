const express = require('express');
const ejs = require('ejs');
const fs = require('fs');

const port = process.env.PORT || 3000;

const app = new express();

//set view engine to ejs
app.set('view engine', 'ejs')

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', `${log}\n`, (error) => {
    if(error) {
      console.log(`Unable to append to server.log`);
    }    
  });
  next();
});

// app.use((req, res) => {
//   res.render('maintenance');
// });

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to my website'    
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About page'    
  });
});

app.listen(port, () => {
  console.log(`Started listening for http requests on port`, port);
});