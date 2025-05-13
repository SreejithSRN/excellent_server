import { NextFunction, Request, Response } from "express";
import { generateAccessToken, UserPayload } from "../utility";
import { httpStatusCode } from "../utility/httpStatusCode";
import { env_variables } from "../boot/config";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { Role } from "../entity/UserEntity";

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

export const roleAuthMiddleware =
  (allowedRoles?: Role[] | undefined) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      if (!allowedRoles) {
        // Public route, no auth needed
        return next();
      }

      const { access_token, refresh_token } = req.cookies;
      if (!access_token && !refresh_token) {
        return res.status(httpStatusCode.UNAUTHORIZED).json({
          message: "Unauthorized, please login again",
        });
      }

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
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
          });
          user = verifyToken(newAccessToken, env_variables.ACCESS_TOKEN_SECRET);
        }
      }

      if (!user) {
        return res.status(httpStatusCode.UNAUTHORIZED).json({
          message: "Unauthorized, please login again",
        });
      }

      // If roles are specified, check user role
      if (Array.isArray(allowedRoles) && !allowedRoles.includes(user.role as Role)) {
        return res.status(httpStatusCode.FORBIDDEN).json({
          message: "Unauthorized, insufficient permissions.",
        });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Error in JWT middleware:", error);
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: "Internal server error." });
    }
  };

