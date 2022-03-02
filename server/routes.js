const adminRoutes = require("../server/All_routes/adminRoutes");
const studentRoutes = require("../server/All_routes/studentRoutes");
const express = require("express");
const router = express.Router();

router.use("/admin", adminRoutes);
router.use("/student", studentRoutes);

module.exports = router;