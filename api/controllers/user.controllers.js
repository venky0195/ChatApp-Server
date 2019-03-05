const userService = require("../services/user.services");
const token = require("../../middleware/token");
const sendMail = require("../../middleware/nodemailer");
exports.login = (req, res) => {
  try {
    req.checkBody("Username", "Invaild Email").isEmail();
    req.checkBody("Password", "Invaild Password").isLength({
      min: 6
    });
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      userService.login(req.body, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.message = "Login Failed";
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.message = "Login Successful";
          responseResult.result = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (err) {
    res.send(err);
  }
};
exports.registration = (req, res) => {
  try {
    req
      .checkBody("firstName", "Invaild Firstname")
      .isLength({
        min: 3
      })
      .isAlpha();
    req
      .checkBody("lastName", "Invaild Lastname")
      .isLength({
        min: 3
      })
      .isAlpha();
    req.checkBody("Email", "Invaild Email").isEmail();
    req.checkBody("Password", "Invaild Password").isLength({
      min: 6
    });
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      userService.registration(req.body, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.message = "Registration Failed";
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.message = "Registration Successful";
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (err) {
    res.send(err);
  }
};
exports.forgotPassword = (req, res) => {
  try {
    var responseResult = {};
    userService.forgotPassword(req, (err, result) => {
      console.log("result=====", result);
      if (err) {
        responseResult.success = false;
        responseResult.error = err;
        res.status(500).send(responseResult);
      } else {
        responseResult.success = true;
        responseResult.result = result;
        console.log("Data in controller==>", result._id);
        const payload = {
          user_id: result._id
        };
        //  console.log(payload);
        const obj = token.GenerateToken(payload);
        const url = `http://localhost:3000/resetPassword/${obj.token}`;
        sendMail.sendEMailFunction(url);
        res.status(200).send(url);
      }
    });
  } catch (err) {
    res.send(err);
  }
};
exports.setPassword = (req, res) => {
  try {
    var responseResult = {};
    userService.resetpassword(req, (err, result) => {
      if (err) {
        responseResult.success = false;
        responseResult.error = err;
        res.status(500).send(responseResult);
      } else {
        console.log("in user controller token is verified giving response");
        responseResult.success = true;
        responseResult.result = result;
        res.status(200).send(responseResult);
      }
    });
  } catch (err) {
    res.send(err);
  }
};
exports.getAllUsers = (req, res) => {
  try {
    var responseResult = {};
    userService.getAllUsers((err, result) => {
      if (err) {
        responseResult.success = false;
        responseResult.error = err;
        res.status(500).send(responseResult);
      } else {
        responseResult.success = true;
        responseResult.result = result;
        res.status(200).send(responseResult);
      }
    });
  } catch (err) {
    res.send(err);
  }
};
