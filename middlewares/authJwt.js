const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const User = require("../models/userModel.js"); 


// verifyToken = (req, res, next) => {
//   let token = req.headers["x-access-token"];

//   if (!token) {
//     return res.status(403).send({ message: "No token provided!" });
//   }

//   jwt.verify(token, config.SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({
//         message: "Unauthorized!",
//       });
//     }
//     req.userId = decoded.id;
//     next();
//   });
// };

isAdmin = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    if (user.role === "admin") {
      next();
    } else {
      res.status(403).send({ message: "Require Admin Role!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
isDirector = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    if (user.role === "director") {
      next();
    } else {
      res.status(403).send({ message: "Require Director Role!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const authJwt = {
  isAdmin,
  isDirector,
};
module.exports = authJwt;
