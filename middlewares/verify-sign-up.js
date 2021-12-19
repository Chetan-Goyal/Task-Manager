const ROLES = require("../models/Role")
const User = require("../models/User")

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // Username
  const username = await User.findOne({ username: req.body.username })
  if (username) {
    return res.status(400).send({ message: "Failed! Username is already in use!" });
  }

  // Email
  const email = await User.findOne({ email: req.body.email })
  if (email) {
    return res.status(400).send({ message: "Failed! Email is already in use!" });
  }

  next();
};

// Role Check
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

module.exports = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
}