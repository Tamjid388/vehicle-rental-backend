import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Bearertoken = req.headers.authorization;

      const token = Bearertoken?.split(" ")?.[1];
      if (!token) {
        return res.status(401).json({
          message: "You Are Not Alowed",
        });
      }
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as JwtPayload;
      req.user = decoded;
      // console.log(decoded);
      // console.log(roles);
      if (roles.length && !roles.includes(decoded?.role as string)) {
        return res.status(401).json({
          error: "Unauthorized",
        });
      }
      next();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

export default auth;
