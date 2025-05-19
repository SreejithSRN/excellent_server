import  express, { Application, Request, Response } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { env_variables } from "../_boot/config"
import { logger } from "../_lib/middleware/logger"
import { httpStatusCode } from "../_lib/common/httpStatusCode"
import { routes } from "../infrastructure/routers"
import { dependencies } from "../_boot/dependencies"
import { setUserFromHeaders } from "../_lib/middleware/setUserFromHeaders"
import http from "http";
import { connectSocketIo } from "../_lib/socket/connection"
import { messages } from "../_lib/common/messages"


const app:Application=express()
const PORT:number=Number(env_variables.PORT || 4004)

const corsOptions={
    origin:String(env_variables.FRONTEND_URL),
    methods:"GET,HEAD,POST,PUT,PATCH,DELETE",
    credentials:true
}
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors(corsOptions))
const morganStream = {
    write: (message: any) => logger.info(message.trim()) 
};
app.use(morgan('combined', { stream: morganStream }));
app.use(setUserFromHeaders)
app.use("/", routes(dependencies))

app.all("*", (req:Request,res:Response)=>{
    res.status(httpStatusCode.NOT_FOUND).json({sussess:false,status:httpStatusCode.NOT_FOUND,message:messages.CHAT_API})
})
const server = http.createServer(app);
connectSocketIo(server);

server.listen(PORT, ()=>{
    console.log(`Chat service is running on port ${env_variables.PORT}`)
})

export default app

