const express = require("express");
const router = express.Router();
const areaController = require("../controllers/areaController");

router.get("/", areaController.onFetchAreas)
router.post("/add", areaController.onAddArea)
router.post("/update", areaController.onUpdateArea)
router.post("/delete", areaController.onRemoveArea)
router.get("/:areaId", areaController.onFetchArea)

module.exports = router;