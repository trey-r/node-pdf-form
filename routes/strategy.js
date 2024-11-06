const express = require("express");
const router = express.Router();
const strategyController = require("../controllers/strategyController");

router.get("/", strategyController.onFetchStrategies)
router.post("/add", strategyController.onAddStrategy)
router.post("/update", strategyController.onUpdateStrategy)
router.post("/delete", strategyController.onRemoveStrategy)
router.get("/:areaId", strategyController.onFetchStrategiesByAreaId)

module.exports = router;