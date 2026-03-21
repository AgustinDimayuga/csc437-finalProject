import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getEnvVar } from "../getEnvVar.js";

declare global {
  namespace Express {
    interface Request {
      userInfo?: JwtPayload | string;
    }
  }
}

export function verifyAuthToken(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).end();
  } else {
    jwt.verify(token, getEnvVar("JWT_SECRET")!, (error, decodedToken) => {
      if (decodedToken) {
        req.userInfo = decodedToken;
        next();
      } else {
        res.status(401).end();
      }
    });
  }
}
