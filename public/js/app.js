//this application runs on the client side. All JS here is consumed by the browser


const weatherForm = document.querySelector('form')
const userInput = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')
const messsageThree = document.querySelector('#message3')
const messageFour = document.querySelector('#message4')
const messageFive = document.querySelector('#message5')
const messageSix = document.querySelector('#message6')
const imgBackground = document.querySelector('.img-background')
const weatherIcon = document.querySelector('#weather-icon')

weatherForm.addEventListener('submit', (e) => { //e is for event
    e.preventDefault() //prevents browser refresh to allow server to render a new page
    const location = userInput.value

    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast.summary
            messsageThree.textContent = data.forecast.currentTemperature + "°C"
            messageFour.textContent = "Max: " + data.forecast.highTemp
            messageFive.textContent = "Min: " + data.forecast.lowTemp
            messageSix.textContent = "Chance of rain: " + data.forecast.precipProbability
        }
        
        
    })
    
    })
    
})