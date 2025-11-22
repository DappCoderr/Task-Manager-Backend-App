import User from '../model/userSchema.js';

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    console.log('Error while creating new user: ', error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to create new user' });
  }
};

export const getAllUser = async(req, res) => {
  try {
    const user = await User.find()
    res.status(201).json({
      success: true, 
      data: user
    })
  } catch (error) {
    console.log("Error getting while fetching all uers details: ",error)
    res.status(500).json({
      success:false,
      message: "Internal server error, fail to fetch all users"
    })
  }
}
