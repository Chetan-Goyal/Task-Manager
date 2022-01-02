const jwt = require("jsonwebtoken")
require('dotenv').config()

const Role = require("../models/Role")
const User = require("../models/User")

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId)

  const roles = await Role.find({ _id: { $in: user.roles } })

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }

  res.status(403).send({ message: "Require Admin Role!" });
  return;
};

isModerator = async (req, res, next) => {
  const user = await User.findById(req.userId)

  const roles = await Role.find({ _id: { $in: user.roles } })

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") {
      next();
      return;
    }
  }

  res.status(403).send({ message: "Require Moderator Role!" });
  return;
};

isStaff = async (req, res, next) => {
  const user = await User.findById(req.userId)

  const roles = await Role.find({ _id: { $in: user.roles } })

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator" || roles[i].name === "admin") {
      next();
      return;
    }
  }

  res.status(403).send({ message: "Require any of the Staff Role!" });
  return;
}

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isStaff
};
module.exports = authJwt;