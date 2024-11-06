const db = require("../db/database");

const handleLogin = async (req, res) => {
  const { pwd } = req.body;
  if (!pwd) return res.status(400).json({ message: "Password is required." });
  const results = await db.promise().query(`SELECT * FROM USERS`);

  const foundUser = results[0].find((user) => user.password === pwd);
  if (foundUser) {
    res.json({ message: "success", username: foundUser.username });
  } else {
    res.json({ message: "Incorrect password" });
  }
};

const fetchUsers = async (_req, res) => {
  try {
    const results = await db.promise().query(`SELECT * FROM USERS`);
    res.json(results[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const updatePassword = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Password and username is required." });
  try {
    const results = await db
      .promise()
      .query(
        `UPDATE USERS SET password = '${password}' WHERE username = '${username}'`
      );
    res.json({ message: "success" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  handleLogin,
  fetchUsers,
  updatePassword,
};
