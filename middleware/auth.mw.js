import jwt from 'jsonwebtoken';
import { SECRET } from '../config/config.js';
import User from '../model/userSchema.js';

export const verifyToken = (req, res, next) => {
  const accessToken = req.headers['x-access-token'];
  if (!accessToken) {
    res.status(500).json({
      success: false,
      message: 'Access Token is not passed',
    });
  }

  jwt.verify(accessToken, SECRET, (err, decode) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: 'Unauthorised token',
      });
    }
    req.userName = decode.userName;
    req.userEmail = decode.userEmail;

    next();
  });
};

export const isAdmin = async (req, res, next) => {
  const email = req.userEmail;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(500).json({
      success: false,
      message: 'User Not Found!',
    });
  }
  if (user.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Only Admin is allowed to access the API',
    });
  }
};
