const express=require('express')
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
const routerapi=require('./routes/justify/justify')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const cors=require('cors')



const app=express()

app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(bodyparser.text())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api',routerapi)


const uri="mongodb+srv://dhia:dhia@cluster0.nkcjd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
const connection=mongoose.connection
connection.once('open',()=>{
    console.log("mongo db connection established successfully")
})

var port = process.env.PORT || 8080;
app.listen(port,'0.0.0.0',()=>{console.log('Server is running')})
