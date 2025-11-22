import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 100,
      validate: [validator.isEmail, 'Invalid email'],
      index: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
    },
  },
  { timestamps: true }
);

// Schema-level Indexes
// userSchema.index({ email: 1 }, { unique: true });

userSchema.pre('save', function (next) {
  const SALT = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, SALT);
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
