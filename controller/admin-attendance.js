const AdminAttendance = require("../models/AdminAttendance");
const error = require("../utils/error");
const { addMinutes, format, isAfter } = require("date-fns");

const getEnable = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });
    if (running) {
      throw error("Already running", 400);
    }
    const attendance = new AdminAttendance();
    await attendance.save();
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    next(error);
  }
};

const getStatus = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });
    if (!running) {
      throw error("Not running", 400);
    }
    const started = addMinutes(new Date(running.createdAt), running.timeLimit);

    if (isAfter(new Date(), started)) {
      running.status = "COMPLETED";
      await running.save();
    }
    return res.status(200).json(running);
  } catch (error) {
    next(error);
  }
};

const getDisable = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });
    if (!running) {
      throw error("Not running", 400);
    }

    running.status = "COMPLETED";
    await running.save();

    return res.status(200).json(running);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEnable,
  getDisable,
  getStatus,
};
