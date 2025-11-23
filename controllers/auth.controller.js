import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userSchema.js';
import { SECRET } from '../config/config.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await User.create({ name, email, password, role });
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    console.log('Error while signUp: ', error);
    res.status(500).json({ success: false, message: 'User signUp failed' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(500).send({
        success: false,
        message: 'User does not exist',
      });
    }

    const passwordValid = bcrypt.compareSync(String(password), user.password);

    if (!passwordValid) {
      res.status(500).send({
        success: false,
        message: 'Invalid password. Try Again!',
      });
    }

    const token = jwt.sign(
      { userName: user.name, userEmail: user.email },
      SECRET,
      { expiresIn: 1000 }
    );

    res.status(201).send({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken: token,
      },
    });
  } catch (error) {
    console.log('Error while getting signIn: ', error);
  }
};