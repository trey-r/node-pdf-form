const db = require("../db/database");

const onFetchStrategies = async (_req, res) => {
  try {
    const results = await db.promise().query(`
        SELECT 
            AREAS.areaId, 
            AREAS.areaname, 
            AREAS.areaType, 
            STRATEGIES.strategyId, 
            STRATEGIES.strategyname
        FROM 
            AREAS
        JOIN 
            STRATEGIES ON AREAS.areaId = STRATEGIES.areaId`
        );
    res.json(results[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const onFetchStrategiesByAreaId = async (req, res) => {
  const { areaId } = req.params;
  if (!areaId) return res.status(400).json({ message: "areaId is required." });
  try {
    const results = await db
      .promise()
      .query(`SELECT * FROM STRATEGIES WHERE areaId = '${areaId}'`);
    res.json(results[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const onAddStrategy = async (req, res) => {
  const { strategyname, areaId } = req.body;
  if (!strategyname || !areaId)
    return res
      .status(400)
      .json({ message: "areaId and strategyname is required." });
  try {
    await db
      .promise()
      .query(
        `INSERT INTO STRATEGIES (strategyname, areaId) VALUES ('${strategyname}', '${areaId}')`
      );
    res.json({ message: "success" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const onUpdateStrategy = async (req, res) => {
  const { strategyname, strategyId } = req.body;
  if (!strategyname || !strategyId)
    return res
      .status(400)
      .json({ message: "strategyname and strategyId is required." });
  try {
    await db
      .promise()
      .query(
        `UPDATE STRATEGIES SET strategyname = '${strategyname}' WHERE strategyId = '${strategyId}'`
      );
    res.json({ message: "success" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const onRemoveStrategy = async (req, res) => {
  const { strategyId } = req.body;
  if (!strategyId)
    return res.status(400).json({ message: "strategyId is required." });
  try {
    await db
      .promise()
      .query(`DELETE FROM STRATEGIES WHERE strategyId = '${strategyId}'`);
    res.json({ message: "success" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  onFetchStrategies,
  onFetchStrategiesByAreaId,
  onAddStrategy,
  onUpdateStrategy,
  onRemoveStrategy,
};
