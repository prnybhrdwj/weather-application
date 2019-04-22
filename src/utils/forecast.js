const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const weatherURL = 'https://api.darksky.net/forecast/96ea35b8a5320815e579488db8341d57/' + latitude + ',' + longitude + '?units=si'

    request ({ url: weatherURL, json: true }, (error, {body}) => { //Since we know response is an object and we only use "body" object from within it so we can directly call body
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) { //We used this because this is how this API returns error - in the body.
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                currentTemp: body.currently.temperature, 
                precipProbability: body.currently.precipProbability, 
                highTemp: body.daily.data[0].temperatureHigh,
                lowTemp: body.daily.data[0].temperatureLow,
                icon: body.daily.data[0].icon,

            }
                //body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain.")
        )}
    })
}

module.exports = forecast