import { config } from "dotenv";
config();

export const env_variables = {
  PORT: process.env.PORT,
  USERMAIL:String(process.env.USERMAIL),
  USERSECRET:String(process.env.USERSECRET)
};
