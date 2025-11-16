import express from "express";
const app = express();

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))

app.use(express.static("public"))

app.get("/", (req, res) => {
  res.send("Home page")
})

// let items = ["apple", "banana", "cherry", "orange"]
const users = [
  { name: "test1", age: 1 },
  { name: "test2", age: 2 },
  { name: "test3", age: 3 },
]

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Home page",
    message: "Welcome",
    items: users
  })
})

app.get("/from", (req, res) => {
  res.render("form", { message: null })
})

app.post("/submit", (req, res) => {
  const name = req.body.myname;

  const message = `Hello, ${name} You submitted the from.`
  res.render("form", { message: message })
})

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
})