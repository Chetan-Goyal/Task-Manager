const models = require('../models')
const Task = models.Task

const getAllTasksAdmin = async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
}

const getTaskAdmin = async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })

  if (!task) {
    return res.status(404).json({ msg: `No task with ID: ${req.params.id}` })
  } else {
    res.status(200).json({ task })
  }
}

const updateTaskAdmin = async (req, res) => {
  const { id: taskID } = req.params

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true })

  if (!task)
    return res.status(404).json({ msg: `No Task with ID: ${req.params.id}` })

  res.status(200).json({ task })
}

const deleteTaskAdmin = async (req, res) => {
  const { id: taskID } = req.params

  const task = await Task.findOneAndDelete({ _id: taskID })

  if (!task)
    return res.status(404).json({ msg: `No Task with ID: ${req.params.id}` })

  res.status(200).json({ task })
}


module.exports = { getAllTasksAdmin, getTaskAdmin, updateTaskAdmin, deleteTaskAdmin }