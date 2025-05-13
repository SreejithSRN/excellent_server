import jwt from "jsonwebtoken";
import { UserPayload } from "./IUserPayload";
import { env_variables } from "../boot/config";


export const generateAccessToken = (payload: UserPayload) => {
  const { _id, email, role } = payload;
  const newPayload = { _id, email, role };

  return jwt.sign(newPayload, String(env_variables.ACCESS_TOKEN_SECRET), {
    expiresIn: "15m",
  });
};
