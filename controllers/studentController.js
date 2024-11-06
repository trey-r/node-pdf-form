const db = require("../db/database");

const fetchStudents = async (_req, res) => {
  try {
    const results = await db.promise().query(`SELECT * FROM STUDENTS`);
    res.json(results[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const addStudent = async (req, res) => {
  const { firstName, lastName, year, class: className, teacher, dob } = req.body;
  try {
    await db
      .promise()
      .query(
        `INSERT INTO STUDENTS (firstName, lastName, year, class, teacher, dob) VALUES ('${firstName}', '${lastName}', '${year}', '${className}', '${teacher}', '${dob}')`
      );
    res.json({ message: "success" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const removeStudent = async (req, res) => {
  const { studentId } = req.body;
  if (!studentId)
    return res.status(400).json({ message: "studentId is required." });
  try {
    await db
      .promise()
      .query(`DELETE FROM STUDENTS WHERE studentId = '${studentId}'`);
    res.json({ message: "success" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const autoGenerate = async (req, res) => {
    const {firstName} = req.params
    try {
      const results = await db.promise().query(`SELECT * FROM STUDENTS WHERE firstName LIKE '%${firstName}%'`);
      res.json(results[0]);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };

module.exports = {
  fetchStudents,
  addStudent,
  removeStudent,
  autoGenerate
};
