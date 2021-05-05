const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()

//Defines paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up for static directory
app.use(express.static(publicDir))

app.get('', (req, res)=> {
    res.render('index', {
        title: 'Dice Fight',
        v: 'v',
        version: '0.00',
        quote: '-First rule of Dice Fight is "You talk about Dice Fight"'
    })
})

app.get('/blog', (req, res)=>{
    res.render('blog',{
        title: 'BLOG',
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'ABOUT'
    })
})

app.get('/play', (req,res)=>{
    res.render('play')
})

app.get('/loading', (req, res)=>{
    res.render('loading')
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server started')
})