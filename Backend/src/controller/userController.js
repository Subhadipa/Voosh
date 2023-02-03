const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const outerFunc = {
  registerUser: async (req, res) => {
    try {
      let userData = req.body;
      const { name, phone, password } = userData;

      let phoneCheck=await userModel.find({phone:phone})
      if(phoneCheck.length>0){
        return res.status(400).send({
            status: false,
            message: "This phone numnber is already present in db!",
          });
      }
      
      let saltRounds = 10;
      let hasedPassword = await bcrypt.hash(password, saltRounds);
      userData.password = hasedPassword;
      let userdbDetails = await userModel.create(userData);
      return res.status(200).send({
        status: true,
        message: "User Registered successfully!",
        data: userdbDetails,
      });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      let userData = req.body;
      const { phone, password } = userData;
      let userDetailsVeify = await userModel.findOne({ phone: phone });
      
      if (!userDetailsVeify) {
        return res.status(400).send({
          status: false,
          message: "No user in db exist with the given phone number!",
        });
      }else{
      let decryptedPassword = await bcrypt.compare(password, userDetailsVeify.password);
      if (decryptedPassword == true) {
        let generatedToken = jwt.sign(
          { userId: userDetailsVeify._id },
          "subha"
        );
        return res.send({
          Message: userDetailsVeify.name + " logged in Succesfully!",
          userId: userDetailsVeify._id,
          token: generatedToken,
        });
      } else {
        return res
          .status(400)
          .send({ status: false, message: "Invalid login credentials!" });
      }
    }
    } catch (error) {
      console.log(error)
      return res.status(500).send({ status: false, message: error });
      
    }
  },
};

module.exports = outerFunc;
