import express, { Application } from "express"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import {env_variables}from "../_boot/config"
import {logger} from "../_lib/middleware/logger"

const app:Application=express()
const PORT:number=Number(env_variables.PORT||4003)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const morganStream = {
    write: (message: any) => logger.info(message.trim()) 
};
app.use(morgan('combined', { stream: morganStream }));


app.listen(PORT, ()=>{
    console.log(`Notification service is running on port ${env_variables.PORT}`)
})

export default app


