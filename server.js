const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// maintainence page, needed when server is down
// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// })


//Register partial parts such as header,footer etc. for handleBar views
hbs.registerPartials(__dirname+'/public/partials'); 
//Register functions to use in HBS
hbs.registerHelper('getDate', () => new Date());
//Set web engine to handleBars
app.set('view engine', hbs);
//Using root for web server
app.use(express.static(__dirname+'/public'));
//------MIDDLEWARE-----------//
app.use((req,res,next) => {
    var log = `${new Date().toString()} ${req.method} ${req.url}\n`;
    fs.appendFile('server.log', log , (err) => {
        if(err){
            console.log('Unable to parse data to server.log')
        }
    })
    console.log(log);
    next();
})



app.get('/', (req, res) => {
    res.render('home.hbs',{
        title: 'Home Page',
        name: 'Karanbir Singh'
    })
});

app.get('/about',(req, res) => {
    res.render('about.hbs',{
        title: 'About Page',
        name: 'Karanbir Singh'
    })
})

app.get('/bad',(req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    })
})

app.listen(3000, () => {
    console.log('\n-----\nServer is up on PORT:3000\n------\n');
});