const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("@hapi/joi");

const User = require("../models/User");

//Enviroment Variable setup
const JWT_SECRET = process.env.JWT_SECRET || config.get("JWT_SECRET");

// api params schema for validation

const apiParamsSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string()
    .min(8)
    .required()
});

// @route post api/v1/user/register
// @ desc Register user
// @acces Public

router.post("/register", async (req, res) => {
  // destructure name and password from body

  let { username, password } = req.body;

  try {
    const { error } = apiParamsSchema.validate({ username, password });
    if (error) {
      res.status(400).json({
        succes: false,
        message: error.details[0].message
      });
    }

    // check username in database before creating a new user

    const user = User.findOne({ username });
    if (username) {
      res.status(400).json({
        succes: false,
        message: "Username already exists please provide a Unique Name"
      });
    }

    // create a new user

    user = await new User({
      username,
      password
    });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //   replacing plain password with hash password
    user.password = hash;

    //create jsonwebtoken 

    const payload {
        user:{
            username,
            id: user.id
        }
    }

    const token = await jwt.sign(payload,JWT_SECRET,{
        experiesIn:"90d"
    })


    return res.json({
        succces:true,
        message : "Your have been registerd succesfully",
        token: token,

    })
  } catch(error){
      console.log("Error",error.message)
      res.status(500).json({
          succces:false,
          message:"Internal Server Error",
          error:error.message
      })
  }
});
