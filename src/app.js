const path=require('path')
const express=require('express')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
console.log(__dirname)
console.log(path.join(__dirname, '../public'))
const app=express()
const publicDirPath=path.join(__dirname, '../public')
//app.com
//app.com/help
//app.com/about
app.use(express.static(publicDirPath))


app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude, longitude, location}= {})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })

    })
    
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})