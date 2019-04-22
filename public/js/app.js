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
    messsageThree.textContent = ''
    messageFour.textContent = ''
    messageFive.textContent = ''
    messageSix.textContent = ''
    weatherIcon.removeAttribute('class')

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast.summary
            messsageThree.textContent = Math.round(data.forecast.currentTemp) + "°C"
            messageFour.textContent = "Max: " + Math.round(data.forecast.highTemp) + "°C" 
            messageFive.textContent = "Min: " + Math.round(data.forecast.lowTemp) + "°C"
            messageSix.textContent = "Chance of rain: " + data.forecast.precipProbability + "%"

            

            if (data.forecast.icon === 'clear-day') {
                weatherIcon.classList.add('wi', 'wi-day-sunny')
            } else if (data.forecast.icon === 'clear-night') {
                weatherIcon.classList.add('wi', 'wi-night-clear')
            } else if (data.forecast.icon === 'rain') {
                weatherIcon.classList.add('wi', 'wi-rain')
            } else if (data.forecast.icon === 'snow') {
                weatherIcon.classList.add('wi', 'wi-snow')
            } else if (data.forecast.icon === 'sleet') {
                weatherIcon.classList.add('wi','wi-sleet')
            } else if (data.forecast.icon === 'wind') {
                weatherIcon.classList.add('wi', 'wi-windy')
            } else if (data.forecast.icon === 'fog') {
                weatherIcon.classList.add('wi', 'wi-fog')
            } else if (data.forecast.icon === 'cloudy') {
                weatherIcon.classList.add('wi', 'wi-cloudy')
            } else if (data.forecast.icon === 'partly-cloudy-day') {
                weatherIcon.classList.add('wi', 'wi-day-cloudy-high')
            } else if (data.forecast.icon === 'partly-cloudy-night') {
                weatherIcon.classList.add('wi', 'wi-night-alt-partly-cloudy')
            } else {

            }
            console.log(data.forecast.icon)
        }
        
        
    })
    
    })
    
})