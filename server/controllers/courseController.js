const mongoose = require("mongoose");
const Course = require("../models/Course");

// @route   GET /api/courses
// @desc    Public - list all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching courses", error: error.message });
  }
};

// @route   GET /api/courses/:id
// @desc    Public - get a single course
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching course", error: error.message });
  }
};

// @route   POST /api/courses
// @desc    Admin only - create a course
const createCourse = async (req, res) => {
  try {
    const { title, description, duration, price } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const course = await Course.create({
      title,
      description,
      duration,
      price,
      createdBy: req.user._id,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error creating course", error: error.message });
  }
};

// @route   PUT /api/courses/:id
// @desc    Admin only - update a course
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const { title, description, duration, price } = req.body;

    if (title !== undefined) course.title = title;
    if (description !== undefined) course.description = description;
    if (duration !== undefined) course.duration = duration;
    if (price !== undefined) course.price = price;

    const updatedCourse = await course.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Server error updating course", error: error.message });
  }
};

// @route   DELETE /api/courses/:id
// @desc    Admin only - delete a course
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.deleteOne();
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error deleting course", error: error.message });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
