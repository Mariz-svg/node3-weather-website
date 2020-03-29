const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/efc307cf0502c1149180955a9d7ca9b0/'+ latitude +',' +longitude
    request({ url, json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather services!',undefined)
        } else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,body.daily.data[0].summary  +' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability +'% chance for rain.')

            
        }
    })

}
module.exports=forecast