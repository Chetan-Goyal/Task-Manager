const Task = require('../models/Tasks')

const asyncWrapper = require('../middlewares/async')

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
})

const createNewTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })

  if (!task)
    return res.status(404).json({ msg: `No task with ID: ${req.params.id}` })

  res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true })

  if (!task)
    return res.status(404).json({ msg: `No Task with ID: ${req.params.id}` })

  res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndDelete({ _id: taskID })

  if (!task)
    return res.status(404).json({ msg: `No Task with ID: ${req.params.id}` })

  res.status(200).json({ task })
})


module.exports = { getAllTasks, createNewTask, getTask, updateTask, deleteTask }