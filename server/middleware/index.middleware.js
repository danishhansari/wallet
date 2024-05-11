import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
  const authToken = req.headers.authorization;
  console.log(authToken);
  if (!authToken.startsWith("Bearer")) {
    return res.status(403).json({ message: "Invalid token" });
  }
  const token = authToken.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = decoded.userID;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized token" });
  }
};

export { verifyJWT };
