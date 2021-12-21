const express = require('express')
const { getAllTasks, createNewTask, getTask, updateTask, deleteTask } = require('../controllers/tasks')
const {
  verifyToken,
  isAdmin,
  isModerator
} = require('../middlewares/auth-jwt')

router = express.Router()

router.route('/').get([verifyToken], getAllTasks).post([verifyToken], createNewTask)

router.route('/:id').get([verifyToken], getTask).patch([verifyToken], updateTask).delete([verifyToken], deleteTask)

module.exports = router