const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.get("/", studentController.fetchStudents)
router.post("/add", studentController.addStudent)
router.post("/delete", studentController.removeStudent)
router.get("/:firstName", studentController.autoGenerate)

module.exports = router;