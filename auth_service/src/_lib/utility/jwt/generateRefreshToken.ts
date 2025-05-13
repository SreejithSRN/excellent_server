import { env_variables } from "../../../_boot/config";
import { UserPayload } from "./IUserPayload";
import jwt from "jsonwebtoken";

export const generateRefreshToken = (payload: UserPayload) => {
  return jwt.sign(payload, String(env_variables.REFRESH_TOKEN_SECRET), {
    expiresIn: "15d",
  });
};
