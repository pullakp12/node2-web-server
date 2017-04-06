const express = require('express');
var app = express();
var fs = require('fs');
var hbs = require('hbs');
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{return new Date().getFullYear()} );
hbs.registerHelper('scremIt',(text)=>{
    return text.toUpperCase();
})
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log =`${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('logs.txt',log+'\n',(error)=>{
        if(error){
            console.log("cannot write to the file");
        }
    });
    next();
});
app.use((req,res,next)=>{
    res.render('maintenance.hbs');
})

app.get('/',(req,res)=>{
   res.render('welcome.hbs',{
       pageTitle:'Home Page',
       message:'Welcome to Home directory'
   })
});
app.get('/about',(req,res)=>{

    res.render('about.hbs',{
        pageTitle:'About Page'.toLowerCase(),
        year:new Date().getFullYear()
    });
});
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage : 'Unable to fullfilled the desired result'
    });
});

app.listen(port,()=>{
    console.log(`server is working at port no : ${port}`);
});
