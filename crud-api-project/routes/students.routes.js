const express = require("express")
const router = express.Router()
const Student = require("../models/students.model")
const multer = require("multer")
const path = require("path")
const fs = require("fs")

const uploadDir = path.join(__dirname, "..", "uploads")
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const newFileName = Date.now() + path.extname(file.originalname)
    cb(null, newFileName)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true)
  } else {
    cb(new Error("Only images are allowed"), false)
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 3
  },
})

// Get All Students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find()
    res.status(200).json({ students, message: "get All Students successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get a single Student
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
    if (!student) {
      res.status(404).json({ message: "Student not found" })
    }
    res.status(200).json({ student, message: "get single student successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Add new Student
router.post("/", upload.single("profile_pic"), async (req, res) => {
  try {
    // const newStudent = await Student.create(req.body)
    const student = new Student(req.body)
    if (req.file) {
      student.profile_pic = req.file.filename
    }
    const newStudent = await student.save()
    res.status(201).json({ newStudent, message: "create new student successfully" })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update a Student
router.put("/:id", upload.single("profile_pic"), async (req, res) => {
  try {
    const existingStudent = await Student.findById(req.params.id)
    if (!existingStudent) {
      if (req.file) {
        const filePath = path.join("./uploads", req.file.filename)
        fs.unlink(filePath, (err) => {
          if (err) console.log("Failed to Delete image:", err)
        })
      }
      res.status(404).json({ message: "Student not found" })
    }

    if (req.file) {
      if (existingStudent.profile_pic) {
        const oldImagePath = path.join("./uploads", existingStudent.profile_pic)
        fs.unlink(oldImagePath, (err) => {
          if (err) console.log("Failed to Delete old image:", err)
        })
      }
      req.body.profile_pic = req.file.filename
    }

    const updateStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json({ updateStudent, message: "student updated successfully" })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete a Student
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id)
    if (!student) {
      res.status(404).json({ message: "Student not found" })
    }

    if (student.profile_pic) {
      const filePath = path.join("./uploads", student.profile_pic)
      fs.unlink(filePath, (err) => {
        if (err) console.log("Failed to Delete :", err)
      })
    }

    res.status(200).json({ message: "Student delete successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router