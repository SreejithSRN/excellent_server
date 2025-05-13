import express, { Application, Request, Response } from "express"
import cors from "cors"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import {env_variables} from "../_boot/config"
import { logger } from "../_lib/middleware/logger"
import { routes } from "../infrastructure/routers"
import { httpStatusCode } from "../_lib/common/httpStatusCode"
import { dependencies } from "../_boot/dependencies"
import { setUserFromHeaders } from "../_lib/middleware/setUserFromHeaders"


const app:Application=express()
const PORT:number=Number(env_variables.PORT || 4001)

// console.log(env_variables.FRONTEND_URL, "this is from auth service")

const corsOptions={
    origin:String(env_variables.FRONTEND_URL),
    methods:"GET,HEAD,POST,PUT,PATCH,DELETE",
    Credentials:true
}

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const morganStream = {
    write: (message: any) => logger.info(message.trim()) 
};
app.use(morgan('combined', { stream: morganStream }));
app.use(cors(corsOptions))
app.use(setUserFromHeaders)
app.use("/", routes(dependencies))
app.all("*", (req:Request,res:Response)=>{
    res.status(httpStatusCode.NOT_FOUND).json({sussess:false,status:httpStatusCode.NOT_FOUND,message:"Auth_API not found"})
})

app.listen(PORT, ()=>{
    console.log(`Auth service is running on port ${env_variables.PORT}`)
})

export default app
