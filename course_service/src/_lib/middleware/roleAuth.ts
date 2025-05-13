import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { generateAccessToken, UserPayload } from "../utility/jwt";
import { NextFunction, Request, Response } from "express";
import { env_variables } from "../../_boot/config";
import { httpStatusCode } from "../common/httpStatusCode";
import { Role } from "../../domain/entities";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

const verifyToken = (token: string, secret: string): UserPayload | null => {
  try {
    return jwt.verify(token, secret) as UserPayload;
  } catch (err) {
    if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError) {
      console.error(`Error verifying token: ${err.message}`);
      return null;
    }
    throw err;
  }
};

export const roleAuthMiddleware= (role?:Role) =>  async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { access_token, refresh_token } = req.cookies;
    let user: UserPayload | null = null;
    if (access_token) {     
      user = verifyToken(access_token, env_variables.ACCESS_TOKEN_SECRET);
    }
    if (!user && refresh_token) {
      user = verifyToken(refresh_token, env_variables.REFRESH_TOKEN_SECRET);
      if (user) {
        const newAccessToken = generateAccessToken({
          _id: user._id,
          email: user.email,
          role: user.role,
        });
        res.cookie("access_token", newAccessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
      }
    }
    if (!user) {
      return res
        .status(httpStatusCode.UNAUTHORIZED)
        .json({ message: "Unauthorized, please login again" });
    }

    if (role && user.role !== role) {
      res
        .status(httpStatusCode.UNAUTHORIZED)
        .json({ message: "Unauthorized, insufficient permissions." });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in JWT middleware:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
