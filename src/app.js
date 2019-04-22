const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather report",
        name: 'Pranay Bhardwaj'
    })
})

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: 'Pranay Bhardwaj'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Ask your questions',
        title: 'Help', 
        name: 'Pranay Bhardwaj'
    })
})


app.get('/weather', (req, res) => {

    const address = req.query.address
    
    if (!address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    
    geocode(address, (error, {latitude, longitude, location} = {}) => { //we are not using (error, data) because data is an object and we already know what values we want from it
        if (error) {
            return res.send({ error }) //next lines won't be executed because return will take us out of the geocode function
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error }) //next lines won't be executed because return will take us out of the forecast function
            }
            
            res.send({
                location,
                forecast: forecastData,
                address,
            })
            
            
        })
    })
    
    
})



app.get('/help/*', (req, res) => {
    res.render('error-page', {
        title: 'Help',
        error: 'The help page you are looking for is not available.',
        name: 'Pranay'
    })
})

app.get('*', (req, res) => {
    res.render('error-page', {
        error: 'Page not found.',
        title: '404',
        name: 'Pranay'
    })
})

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})