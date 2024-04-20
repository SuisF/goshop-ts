import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export class MiddlewareAuth {
  public authenticationToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
      return res.status(401).json({
        message: "Token Not Found",
      });
    }

    jwt.verify(token, `${process.env.JWT_TOKEN_SECRET}`, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: "User Is Unauthorized",
        });
      }
    });

    next();
  }
}
