const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      trim: true,
      maxLength: [20, 'Name can not be more than 20 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  }
)

module.exports = mongoose.model('Task', TaskSchema)