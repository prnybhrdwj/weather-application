const request = require('request')


const geocode = (address, callback) => {
    const locationURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicHJhbmF5LWJoYXJkd2FqIiwiYSI6ImNqdWNpZ3V0cjBta3c0NnBpcXY0dmdud2cifQ.3era5Qj0qfVCLn0i6PyX3Q'

    request ({url: locationURL, json:true}, (error, {body}) => { //response is an object and we use the "body" property within that object, so we directly called the body value
        if (error) {
            callback('Unable to connect to API service', undefined)
        } else if (body.features.length === 0) {  //Wrote this because we know that response returns an array in case of relevant results. Check API response to find the kind of response it gives in case of error to decide the if condition
            callback('Unable to find location. Try another search', undefined)  
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })  
        } 
        
    })
}

module.exports = geocode