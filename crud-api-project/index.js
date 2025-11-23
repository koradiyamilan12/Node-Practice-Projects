const express = require("express");
const app = express()
const studentRoutes = require("./routes/students.routes")
const connectDB = require("./config/database");
const auth = require("./middleware/auth")
const userRoutes = require("./routes/user.routes")
const { MulterError } = require("multer");
const rateLimit = require("express-rate-limit")
const helmet = require("helmet")
const cors = require("cors")
const path = require("path")

connectDB()

const PORT = process.env.PORT

const limiter = rateLimit({
  windowMs: 1000 * 60,
  max: 5,
  message: "Too many request from this IP, please try agian later."
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors())

app.use(limiter)

app.use(helmet())

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/api/users", userRoutes)
app.use("/api/students", auth, studentRoutes)

app.use((error, req, res, next) => {
  if (error instanceof MulterError) {
    return res.status(400).json(`Image Error:${error.message} : ${error.code}`)
  } else if (error) {
    return res.status(500).json(`Somthing went wrong: ${error.message}`)
  }
  next()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
