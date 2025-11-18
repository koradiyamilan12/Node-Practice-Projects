const express = require("express");
const app = express()
const studentRouters = require("./routes/students.routes")
const connectDB = require("./config/database");
const { MulterError } = require("multer");

connectDB()

const PORT = process.env.PORT

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api/students", studentRouters)

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