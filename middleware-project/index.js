const express = require("express")
const app = express()
const router = express.Router()

const mymiddleware = (req, res, next) => {
  const d = new Date()
  console.log(`Date : ${d.getMinutes()} ${d.getHours()} ${d.getDate()} / ${d.getMonth()} ${req.method} ${req.url}`)
  next()
}

const myOtherMiddleware = (req, res, next) => {
  console.log("Second Middleware")
  next()
}

// router level middleware

router.use((req, res, next) => {
  console.log("router level middleware")
  next()
})



app.use(mymiddleware)

router.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>")
})

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>")
})

app.get("/about", (req, res) => {
  res.send("<h1>About Page</h1>")
})

app.use((req, res) => {
  res.send("<h1>Page Not Found.</h1>")
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something Broke!")
  next()
})

app.use("/test", router)

app.listen(3000, () => {
  console.log("Server running on port 3000")
})