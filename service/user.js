const User = require("../models/User");

const findUser = () => {
  return User.find();
};

const findUserByProperty = (key, value) => {
  if (key === "_id") {
    return User.findById(value);
  }
  console.log("[key]: value", { [key]: value });
  return User.findOne({ [key]: value });
};

const updateUser = async (id, data) => {
  const user = await findUserByProperty("email", data.email);
  if (user) {
    throw error("Email already in use", 400);
  }
  return User.findByIdAndUpdate(id, { ...data }, { new: true });
};

const createNewUser = ({ name, email, password, roles, accountStatus }) => {
  const user = new User({
    name,
    email,
    password,
    roles: roles ? roles : ["STUDENT"],
    accountStatus: accountStatus ? accountStatus : "PENDING",
  });
  return user.save();
};

module.exports = {
  findUserByProperty,
  createNewUser,
  findUser,
  updateUser,
};
