const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("server is running at http://localhost:3000")
})

// app.get("/", (req, res) => {
//   res.send({
//     name: "milan",
//     age: 20
//   })
// })

// app.get("/", (req, res) => {
//   res.send(
//     ["apple", "banana", "mango"]
//   )
// })

// app.get("/", (req, res) => {
//   const users = [
//     { id: 1, name: "salman" },
//     { id: 2, name: "akshay" }
//   ]
//   res.json(users)
// })

app.get("/", (req, res) => {
  res.jsonp({ name: "milan", age: 20 })
})

// app.get("/about", (req, res) => {
//   res.redirect(301, "https://www.google.com")
// })

// app.get("/about", (req, res) => {
//   res.redirect("..")
// })

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.post("/about", (req, res) => {
//   res.send(req.body)
// })

app.post("/about", (req, res) => {
  // res.send(req.hostname)
  // res.send(req.ip)
  // res.send(req.ips)
  // res.send(req.method)
  // res.send(req.originalUrl)
  // res.send(req.path)
  // res.send(req.protocol)
  // res.send(req.secure)
  // res.send(req.route)
  // if (req.accepts("html")) {
  //   res.send("<h1>Hello HTML</h1")
  // } else if (req.accepts("json")) {
  //   res.send({ message: "Hello JSON" })
  // } else if (req.accepts("xml")) {
  //   res.send("<message>Hello XML</message>")
  // } else {
  //   res.send("Content type not supported")
  // }
  // res.send(req.headers.host)
  // res.send(req.get("Accept"))
  if (req.is("application/json")) {
    res.send("Valid JSON Data")
  } else if (req.is("text/html")) {
    res.send("HTML Data")
  } else {
    res.status(400).send("Unsupported Content-Type.")
  }
})

// app.get("/user", (req, res) => {
//   res.render("user")
// })

// app.get("/download", (req, res) => {
//   res.download("./files/dynamic_export.pdf", "Document.pdf")
// })

// app.get("/download", (req, res) => {
//   res.sendFile(__dirname + "/files/dynamic_export.pdf")
// })

// app.get("/end", (req, res) => {
//   res.write("this is testing")
//   res.end()
// })

// app.get("/error", (req, res) => {
//   res.sendStatus(200)
// })

// app.get("/error", (req, res) => {
//   res.status(200).send("hello")
// })

// app.get("/check", (req, res) => {
//   console.log(res.headersSent)
//   res.send("hello")
//   console.log(res.headersSent)
// })

// app.get("/check", (req, res) => {
//   res.set("custom-header", "hello123")
//   console.log(res.get("custom-header"))
//   res.send("Header Set")
// })

// // app.get("/user", (req, res) => {
// //   res.send("<h1>user page</h1>")
// // })

// app.get("/about", (req, res) => {
//   res.send("<h1>Welcome to About Page</h1>")
// })

// app.get("/about/user", (req, res) => {
//   res.send("<h1>user page</h1>")
// })

// app.get("/random.text", (req, res) => {
//   res.send("<h1>random Page</h1>")
// })

// // app.get("/user/:userid/book/:bookid", (req, res) => {
// //   res.send("Book Id :" + req.params.bookid)
// //   // res.send(req.params.userid)
// // })

// app.get("/user/:userid-:bookid", (req, res) => {
//   res.send(req.params)
// })

// app.get("/search", (req, res) => {
//   const name = req.query.name
//   const age = req.query.age

//   res.send(`Search result for Name : ${name}, Age : ${age}`)
// })

// req.params
// req.query
// req.body
// req.cookies