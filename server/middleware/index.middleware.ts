import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      userID?: string;
    }
  }
}

interface DecodedToken extends JwtPayload {
  userID: string;
  // Add other properties if needed
}

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  const authToken: string | undefined = req.headers.authorization;
  if (
    !authToken ||
    typeof authToken !== "string" ||
    !authToken.startsWith("Bearer")
  ) {
    return res.status(403).json({ message: "Invalid token" });
  }
  const token = authToken.split(" ")[1];
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    ) as DecodedToken;
    req.userID = decoded.userID;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized token" });
  }
};

export { verifyJWT };
