import express, { Application } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import proxy from "express-http-proxy";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { logger } from "./middleware/logger";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

// Security Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging with Morgan
const morganStream = {
  write: (message: any) => logger.info(message.trim()),
};
app.use(morgan("combined", { stream: morganStream }));

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: "GET,HEAD,POST,PUT,PATCH,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Cookie", "Range"],
  exposedHeaders: ["Content-Range", "Content-Length", "Accept-Ranges"],
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Rate Limiting (15 minutes, max 100 requests)
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100,
// });
// app.use(limiter);

// API Gateway Routing
const routes = [
  // { path: "/api/user", serviceUrl: process.env.USER_SERVICE },
  { path: "/api/auth", serviceUrl: process.env.AUTH_SERVICE },
  { path: "/api/course", serviceUrl: process.env.COURSE_SERVICE },
  { path: "/api/notification", serviceUrl: process.env.NOTIFICATION_SERVICE },
  { path: "/api/payment", serviceUrl: process.env.PAYMENT_SERVICE },
  { path: "/api/chat", serviceUrl: process.env.CHAT_SERVICE },
];

routes.forEach(({ path, serviceUrl }) => {
  if (serviceUrl) {
    app.use(path, proxy(serviceUrl));
  } else {
    console.warn(`Warning: Missing service URL for ${path}`);
  }
});

// Start API Gateway
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});












































// import express, { Application, urlencoded } from "express"
// import cookieParser from "cookie-parser"
// import helmet from "helmet";
// import cors from "cors"
// import proxy from "express-http-proxy"
// import morgan from "morgan"
// import dotenv from "dotenv"
// import rateLimit from "express-rate-limit";
// import { logger } from "./middleware/logger"

// dotenv.config()

// const app:Application=express()
// const PORT:number=Number(process.env.PORT || 4000)
// app.use(helmet())

// app.use(express.json())
// app.use(express.urlencoded({extended:true}))
// app.use(cookieParser())

// const morganStream = {
//     write: (message: any) => logger.info(message.trim())
// };
// app.use(morgan('combined', { stream: morganStream }));

// const corsOptions = {
//     origin: process.env.CLIENT_URL as string,
//     methods: ["GET","POST","HEAD","PUT","PATCH","DELETE"],
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
// };

// app.use(cors(corsOptions))

// const limiter = rateLimit({
//     windowMs: 15 * 16 * 1000,
//     max : 100
// })
// app.use(limiter)

// const routes=[
//     // {path:"/api/user", serviceUrl:process.env.USER_SERVICE},
//     {path:"/api/auth", serviceUrl:process.env.AUTH_SERVICE},
//     {path:"/api/course", serviceUrl:process.env.COURSE_SERVICE},
//     {path:"/api/notification", serviceUrl:process.env.NOTIFICATION_SERVICE},
//     {path:"/api/payment", serviceUrl:process.env.PAYMENT_SERVICE},
//     {path:"/api/chat", serviceUrl:process.env.CHAT_SERVICE},
// ]

// routes.forEach((route)=>{
//     if (route.serviceUrl){
//         app.use(route.path,proxy(route.serviceUrl))
//     }
// })

// app.listen(PORT,()=>{
//     console.log(`api-gateway sever is running on port : ${PORT}`)
// })
