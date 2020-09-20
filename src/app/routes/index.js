const express = require("express");
const router = express.Router();

router.use("/weathers", require("./weather"));

module.exports = router;