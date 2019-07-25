import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line consistent-return
const authenticate = (req, res, next) => {
  const token = req.headers.authorization
  || req.body.token
  || req.query.token;

  if (!token) {
    return res.status(401).json({
      error: 'Please provide a token',
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({
        error: 'Invalid token provided',
      });
    }

    req.token = token;
    req.user = decodedToken;
    return next();
  });
};

export default authenticate;
