
const express = require('express')
const app = express();

// Position of Middleware matters. Placing it at incorrect place 
// will not work
require('express-async-errors')

const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()

const notFound = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

const port = 3000

app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`)
    })
  } catch (error) {
    console.log(`Error: error`)
  }
}

start()