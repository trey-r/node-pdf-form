const db = require("../db/database");

const onFetchAreas = async (_req, res) => {
  try {
    const results = await db.promise().query(`SELECT * FROM AREAS`);
    res.json(results[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const onFetchArea = async (req, res) => {
    const {areaId} = req.params;
    try {
      const results = await db.promise().query(`SELECT * FROM AREAS WHERE areaId = '${areaId}'`);
      res.json(results[0]);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };

const onAddArea = async (req, res) => {
  const { areaname, areaType } = req.body;
  if (!areaname)
    return res.status(400).json({ message: "areaname and areaType is required." });
  try {
    await db
      .promise()
      .query(`INSERT INTO AREAS (areaname, areaType) VALUES ('${areaname}', '${areaType}')`);
    res.json({ message: "success" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const onUpdateArea = async (req, res) => {
  const { areaId, areaname, areaType } = req.body;
  if (!areaId || !areaname || !areaType)
    return res
      .status(400)
      .json({ message: "areaId, areaname and areaType is required." });
  try {
    await db
      .promise()
      .query(
        `UPDATE AREAS SET areaname = '${areaname}', areaType = '${areaType}' WHERE areaId = '${areaId}'`
      );
    res.json({ message: "success" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const onRemoveArea = async (req, res) => {
    const { areaId } = req.body;
    if (!areaId)
      return res
        .status(400)
        .json({ message: "areaId is required." });
    try {
      await db
        .promise()
        .query(
          `DELETE FROM AREAS WHERE areaId = '${areaId}'`
        );
      res.json({ message: "success" });
    } catch (err) {
      res.status(500).json(err.message);
    }
  };

module.exports = {
  onFetchAreas,
  onFetchArea,
  onAddArea,
  onUpdateArea,
  onRemoveArea
};
