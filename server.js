import express from 'express'
import dotenv from "dotenv"
import {productsRouter} from './routes/index.js'

dotenv.config()


const PORT=process.env.PORT

const app=express()
app.use(express.json())

app.use("/products",productsRouter)

app.use((err,req,res)=>{
    if(err){
        res.send({message:err.message})
    }else{
        res.status(400).send("NOT FOUND")
    }
})


app.listen(PORT,()=>{
    console.log(`Server runnig on port ${PORT}\nlocalhost:${PORT}`)
})