const adminRoutes = require("../server/All_routes/adminRoutes");
const studentRoutes = require("../server/All_routes/studentRoutes");
const commonRoutes = require("../server/All_routes/commonRoutes");
const facultyRoutes = require("../server/All_routes/facultyRoutes");
const express = require("express");
const router = express.Router();

router.use("/admin", adminRoutes);
router.use("/student", studentRoutes);
router.use("/common", commonRoutes);
router.use("/faculty", facultyRoutes);
module.exports = router;