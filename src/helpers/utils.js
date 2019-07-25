import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class Utils {
  static generateToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 24 * 30
    });
    return token;
  }
}

export default Utils;
