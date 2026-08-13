const express = require("express");
const { enrollInCourse, getMyEnrollments } = require("../controllers/enrollmentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:courseId", protect, enrollInCourse);
router.get("/my", protect, getMyEnrollments);

module.exports = router;
