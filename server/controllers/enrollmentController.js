const mongoose = require("mongoose");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

// @route   POST /api/enrollments/:courseId
// @desc    Authenticated user enrolls in a course
const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const existing = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
    });
    if (existing) {
      return res.status(409).json({ message: "You are already enrolled in this course" });
    }

    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: courseId,
    });

    res.status(201).json(enrollment);
  } catch (error) {
    // Handles the rare race-condition case caught by the unique index
    if (error.code === 11000) {
      return res.status(409).json({ message: "You are already enrolled in this course" });
    }
    res.status(500).json({ message: "Server error enrolling in course", error: error.message });
  }
};

// @route   GET /api/enrollments/my
// @desc    Authenticated user - list of their enrolled courses
const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id })
      .populate("course")
      .sort({ createdAt: -1 });

    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching enrollments", error: error.message });
  }
};

module.exports = { enrollInCourse, getMyEnrollments };
