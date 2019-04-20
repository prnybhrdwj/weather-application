//this application runs on the client side. All JS here is consumed by the browser


const weatherForm = document.querySelector('form')
const userInput = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')
const weatherResult = document.querySelector('#weather-result')
const imgBackground = document.querySelector('.img-background')

weatherForm.addEventListener('submit', (e) => { //e is for event
    e.preventDefault() //prevents browser refresh to allow server to render a new page
    const location = userInput.value

    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    weatherResult.style.display = 'block'

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
        
        
    })
    
    })
    
})