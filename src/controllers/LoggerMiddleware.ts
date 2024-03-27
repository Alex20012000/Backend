import { Request, Response, NextFunction } from "express";
import { Middleware } from "./Controller";
import { verify, Secret, JwtPayload } from "jsonwebtoken";

export class LoggerMiddleware extends Middleware {
  constructor() {
    super();
  }

  public handle(req: Request, res: Response, next: NextFunction) {
    const token = String(req.headers.authorization).replace("Bearer ", "");

    verify(token, process.env.JWTSECRET as Secret, (err, payload) => {
      if (err) {
        console.log("Verification error:", err);
        return res.status(401).json({ success: false, err, payload });
      }

      const pay: JwtPayload = payload as JwtPayload;

      if (pay.exp === undefined || new Date().getMilliseconds() <= pay.exp) {
        return next();
      } else {
        return res
          .status(401)
          .json({ error: true, message: "Token has expired" });
      }
    });
  }
}
