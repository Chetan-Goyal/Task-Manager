const express = require('express')
const { getAllTasks, createNewTask, getTask, updateTask, deleteTask } = require('../controllers/tasks')
const { getAllTasksAdmin, getTaskAdmin, updateTaskAdmin, deleteTaskAdmin } = require('../controllers/admin-tasks');

const {
  verifyToken,
  isAdmin,
  isModerator,
  isStaff
} = require('../middlewares/auth-jwt')

router = express.Router()

// Admin Routes
router.route('/admin/').get([verifyToken, isStaff], getAllTasksAdmin)
router.route('/admin/:id').get([verifyToken, isStaff], getTaskAdmin).patch([verifyToken, isAdmin], updateTaskAdmin).delete([verifyToken, isAdmin], deleteTaskAdmin)

// User Routes
router.route('/').get([verifyToken], getAllTasks).post([verifyToken], createNewTask)
router.route('/:id').get([verifyToken], getTask).patch([verifyToken], updateTask).delete([verifyToken], deleteTask)


module.exports = router