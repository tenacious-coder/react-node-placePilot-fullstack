import jwt from "jsonwebtoken";

// ✅ Check if user is authenticated
export const isAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "No token found, please login" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // store user info for later use
    req.id = decoded.id || decoded.userId|| decoded._Id ;

    next();
  } catch (error) {
    return res.status(500).json({ message:` Auth error: ${error.message} `});
  }
};

// ✅ Check if user is admin
// export const isAdmin = (req, res, next) => {
//   if (!req.user || req.user.role !== "admin") {
//     return res.status(403).json({ message: "Access denied. Admins only" });
//   }
//   next();
// };

export default isAuth;
