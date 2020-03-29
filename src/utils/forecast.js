const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/efc307cf0502c1149180955a9d7ca9b0/'+ latitude +',' +longitude
    request({ url, json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather services!',undefined)
        } else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{ console.log(body.daily.data[0])
            callback(undefined,body.daily.data[0].summary  +' It is currently ' + body.currently.temperature + ' degrees out. The high today is ' + body.daily.data[0].temperatureHigh+' The low is '+body.daily.data[0].temperatureLow+'. There is a ' + body.currently.precipProbability +'% chance for rain.')

            
        }
    })

}
module.exports=forecast