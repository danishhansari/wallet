import jwt from "jsonwebtoken";
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Unauthorized access" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedUser);
    req.userId = decodedUser.userId;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized access" });
  }
};

export { verifyJWT };
