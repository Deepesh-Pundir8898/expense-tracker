import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    // const token = req.headers.authorization.split(" ")[1];
    const { token } = req.body;
    console.log(token);
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Not authorized to access this resource",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Not authorized to access this resource",
    });
  }
};
