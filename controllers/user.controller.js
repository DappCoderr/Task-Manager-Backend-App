import User from '../models/userSchema.js';

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

export const getUserDetailsByEmail = async (req, res) => {
  try {
    const email = req.userEmail;
    const user = await User.findOne({ email });
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log('Error while getting user details: ', error);
    res.status(500).json({
      success: false,
      message: 'Fail to get user details',
    });
  }
};
