const router = require("express").Router();

// question route
router.use("/questions", require("./question"));

// option route
router.use("/options", require("./option"));

module.exports = router;
