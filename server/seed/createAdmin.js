// Run with: npm run seed:admin
// Creates (or updates the role of) one admin account, using the
// ADMIN_NAME / ADMIN_EMAIL / ADMIN_PASSWORD values from .env
// This is intentionally NOT an HTTP endpoint - there is no public
// admin-registration route, as required by the assignment rules.

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");

const run = async () => {
  await connectDB();

  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error("Missing ADMIN_NAME, ADMIN_EMAIL, or ADMIN_PASSWORD in .env");
    process.exit(1);
  }

  let admin = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() }).select("+password");

  if (admin) {
    admin.role = "admin";
    // Only reset the password if you intentionally want to; here we leave
    // the existing password untouched if the account already exists.
    await admin.save();
    console.log(`Existing user promoted to admin: ${admin.email}`);
  } else {
    admin = await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: "admin",
    });
    console.log(`Admin account created: ${admin.email}`);
  }

  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error("Failed to seed admin:", err);
  process.exit(1);
});
