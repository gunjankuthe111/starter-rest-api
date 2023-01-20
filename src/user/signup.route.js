const express = require("express");
const User = require("./user.model");
const bcrypt = require("bcrypt");

const app = express.Router();

app.post("/", async (req, res) => {
  const {email, password} = req.body;

  try {
    if(!email || !password){
        res.send("Enter Valid Credentials")
    }
    const isExist = await User.findOne({email});
    if(isExist){
        return res.send("User Already exist")
    }
    else{
        bcrypt.hash(password, 5, async function (err, hash) {
          if(err){
            res.send("Somthing went wrong")
          }
          const user = new User({email, password:hash});
          await user.save();
          return res.status(201).send(user);
        });
    }
  } catch (e) {
    return res.status(404).send(e.message);
  }
});



module.exports = app;
