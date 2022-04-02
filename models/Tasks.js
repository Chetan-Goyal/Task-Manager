const mongoose = require('mongoose')
const { colorValidator } = require('./validators/color_validator')



const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
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
    category: {
      type: String,
      trim: true,
      default: null
    },
    isReminderSet: {
      type: Boolean,
      default: false
    },
    isImportant: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      validate: [colorValidator, 'Invalid color'],
    },

    deadline: { type: Date, default: null },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },

  }
)

module.exports = mongoose.model('Task', TaskSchema)