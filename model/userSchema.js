import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 100,
      validator: [validator.isEmail, "Invalid email ID"]
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
      minlength: 8
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
    },
  },
  { timestamps: true }
);

userSchema.index({email:1}, {unique:true})

userSchema.pre("save", (next) => {
    const SALT = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, SALT)
    next()
})

const user = mongoose.model('User', userSchema);

export default user;
