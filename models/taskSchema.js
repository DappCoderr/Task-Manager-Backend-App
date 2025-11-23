import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
      maxlength: 250,
    },

    status: {
      type: String,
      required: true,
      enum: ['PENDING', 'IN-PROGRESS', 'DONE'],
      default: 'PENDING',
      index: true,
    },

    priority: {
      type: String,
      required: true,
      enum: ['LOW', 'MEDIUM', 'HIGH'],
      default: 'MEDIUM',
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      default: null,
      index: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

taskSchema.pre('save', async function (next) {
  try {
    const User = mongoose.model('User');
    const assignedUserRole = await User.findById(this.assignedTo).select(
      'role'
    );
    if (!assignedUserRole) {
      next(new Error('Assigned User not found'));
    }
    if (assignedUserRole.role !== 'USER') {
      next(new Error('Task is only assigned to USER'));
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
