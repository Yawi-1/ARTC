const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require('cors')

const dbConnection = require('./src/config/db')
const app = express()
const PORT = process.env.PORT || 5000;


const userRoutes = require('./src/routes/user.routes')

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))



// ROutes 
app.use('/api/auth', userRoutes)
app.get('/', (req, res) => { res.send('<h1>Hello from server</h1>') })


// Error Handler 
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Server Setup
const startServer = async () => {
  await dbConnection()
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT} `)
  })
}
startServer()