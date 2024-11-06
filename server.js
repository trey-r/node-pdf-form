const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));


//routes
app.get("/", (req, res) => {});
app.use("/auth", require("./routes/auth"));
app.use("/area", require("./routes/area"));
app.use("/strategy", require("./routes/strategy"));
app.use("/student", require("./routes/student"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
