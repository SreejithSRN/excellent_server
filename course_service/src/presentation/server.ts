import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env_variables } from "../_boot/config";
import { logger } from "../_lib/middleware/logger";
import { dependencies } from "../_boot/dependencies";
import { httpStatusCode } from "../_lib/common/httpStatusCode";
import { routes } from "../infrastructure/routers";
import { setUserFromHeaders } from "../_lib/middleware/setUserFromHeaders";

const app: Application = express();
const PORT: number = Number(env_variables.PORT || 4002);

const corsOptions = {
  origin: env_variables.FRONTEND_URL || "http://localhost:3000",
  methods: "GET,HEAD,POST,PUT,PATCH,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Cookie", "Range"],
  exposedHeaders: ["Content-Range", "Content-Length", "Accept-Ranges"],
};

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

const morganStream = {
  write: (message: any) => logger.info(message.trim()),
};
app.use(morgan("combined", { stream: morganStream }));

app.use(setUserFromHeaders)

app.use("/", routes(dependencies));
app.all("*", (req: Request, res: Response) => {
  res
    .status(httpStatusCode.NOT_FOUND)
    .json({
      sussess: false,
      status: httpStatusCode.NOT_FOUND,
      message: "Course_API not found",
    });
});

app.listen(PORT, () => {
  console.log(`Course service is running on port ${env_variables.PORT}`);
});

export default app;
