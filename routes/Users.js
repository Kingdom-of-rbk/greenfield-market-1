const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User.js");
users.use(cors());

process.env.SECRET_KEY = "secret";

users.post("/register", (req, res) => {
  const today = new Date();
  req.body.created = today;

  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user === null) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          req.body.password = hash;
          User.create(req.body)
            .then((user) => {
              res.send(true);
            })
            .catch((err) => {
              res.send(false);
            });
        });
      } else {
        res.json(false);
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

users.post("/login", (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user !== null) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            address: user.address,
            mobile1: user.mobile1,
            mobile2: user.mobile2,
            email: user.email,
          };
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });
          res.send(token);
        } else {
          res.json({ error: "User does not exist" });
        }
      } else {
        res.json({ error: "User does not exist" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

users.post("/profile", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );

  User.findOne({
    _id: decoded._id,
  })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.send("User does not exist");
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

module.exports = users;
