const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

const auth = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"]
    console.log(bearerHeader)
    if (typeof bearerHeader != "undefined") {
      // const bearer = bearerHeader.split(" ")
      // const token = bearer[1]
      const token = bearerHeader.split(" ")[1]
      const user = jwt.verify(token, process.env.JWT_SECRET)
      console.log(user)
      req.token = user
      next()
    } else {
      res.status(401).json({ message: "No token provided" })
    }
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" })
  }
}

module.exports = auth