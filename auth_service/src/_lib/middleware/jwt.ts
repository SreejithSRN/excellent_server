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
    throw err
  }
};

export const roleAuthMiddleware = (role?: Role) => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { access_token, refresh_token } = req.cookies;

    // Check if no tokens are present
    if (!access_token && !refresh_token) {
      return res.status(httpStatusCode.UNAUTHORIZED).json({
        message: "Unauthorized, please login again",
      });
    }

    let user: UserPayload | null = null;

    // Verify access token
    if (access_token) {
      user = verifyToken(access_token, env_variables.ACCESS_TOKEN_SECRET);
    }

    // Verify refresh token if access token is invalid
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

        // Assign new token to user
        user = verifyToken(newAccessToken, env_variables.ACCESS_TOKEN_SECRET);
      }
    }

    // If still no user, reject
    if (!user) {
      return res.status(httpStatusCode.UNAUTHORIZED).json({
        message: "Unauthorized, please login again",
      });
    }

    //  Role-based authentication
    if (role && user.role !== role) {
      return res.status(httpStatusCode.FORBIDDEN).json({
        message: "Unauthorized, insufficient permissions.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in JWT middleware:", error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: httpStatusCode.INTERNAL_SERVER_ERROR });
  }
};