
const jwt = require("jsonwebtoken");
const encrypt = require('../encryption/encrypt');
const userModel = require("../models/User");
const validate = require("../validation/validator");

module.exports = {
  register : async function (req, res) {
  try {
    const requestBody = req.body;
    const { name, email, password } = requestBody;
    if (!validate.isValidRequestBody(requestBody)) {
      res.status(400).send({
        status: false,
        message: "Invalid request parameters. Please provide user details",
      });
      return;
    }

    if (!validate.isValid(name)) {
      res.status(400).send({ status: false, message: `name is required` });
      return;
    }

    if (!validate.isValid(email)) {
      res.status(400).send({ status: false, message: `Email is required` });
      return;
    }
    if (!validate.validateEmail(email)) {
      res.status(400).send({
        status: false,
        message: `Email should be a valid email address`,
      });
      return;
    }
    const isEmailAlreadyUsed = await userModel.findOne({ email }); // {email: email} object shorthand property

    if (isEmailAlreadyUsed) {
      res.status(400).send({
        status: false,
        message: `${email} email address is already registered`,
      });
      return;
    }

    if (!validate.isValid(password)) {
      res.status(400).send({ status: false, message: `Password is required` });
      return;
    }
    if (!validate.validatePassword(password)) {
      res.status(400).send({
        status: false,
        message: "password should be between 8 and 15 characters",
      });
      return;
    }
    const hashPassword = await encrypt.hashPassword(password);
    requestBody.password = hashPassword;

    const createUserData = await userModel.create(req.body);
    res.status(201).send({
      status: true,
      msg: "User registred successfully",
      data: createUserData,
    });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
},
//---------------------------------------------------------------------------------------------------------------//

login : async function (req, res) {
  try {
    const requestBody = req.body;
    if (!validate.isValidRequestBody(requestBody)) {
      res.status(400).send({
        status: false,
        message: "Invalid request parameters. Please provide login details",
      });
      return;
    }

    // Extract params
    let { email, password } = requestBody;

    // Validation
    if (!validate.isValid(email) && !validate.isValid(password)) {
      res
        .status(400)
        .send({
          status: false,
          message: `Email and password both are required`,
        });
      return;
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      res
        .status(401)
        .send({ status: false, message: `Invalid login credentials` });
      return;
    }
    const comparePassword = await encrypt.comparePassword(
      password,
      user.password
    );

    if (!comparePassword) {
      res
        .status(401)
        .send({ status: false, message: `Invalid login credentials` });
      return;
    }
    const token = await jwt.sign(
      {
        userId: user._id,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 1800,
      },
      "Knovator_Technologies"  
    );

    res.header("x-api-key", token);
    res.status(200).send({ status: true, message: `user login successfully` });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
}
}
