import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../model/userSchema.js';
import { SECRET } from '../config/config.js';

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
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

export const signIn = async (req, res) => {
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
      { userId: user.name, userEmail: user.email },
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

export const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log('Error getting while fetching all uers details: ', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error, fail to fetch all users',
    });
  }
};
