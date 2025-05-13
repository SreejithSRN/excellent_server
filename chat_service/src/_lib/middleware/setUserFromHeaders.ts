import { Request, Response, NextFunction } from "express";

export const setUserFromHeaders = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.headers["x-user-id"] as string;
  const email = req.headers["x-user-email"] as string;
  const role = req.headers["x-user-role"] as string;

  if (_id && email && role) {
    req.user = { _id, email, role };
  }

  next();
};
