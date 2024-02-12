import UserModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username: username });

    if (user)
      return res.status(400).json({
        message: "Пользователь с таким именем уже есть!",
      });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      ...req.body,
      password: hashPassword,
    });

    res.status(200).json({
      message: "Succens",
      newUser,
    });
  } catch (err) {
    console.log(err);
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user)
      return res.status(400).json({
        message: "Пользователь с таким именем нет",
      });

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect)
      return res.status(400).json({
        message: "неправильный пароль",
      });

    const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN, 
      {
      expiresIn: "1d",
    })

    const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN, 
      {
      expiresIn: "10d",
    })


    res.cookie('refresgToken', refreshToken, {
      httpOnly:true,
      path:'/api/refreshToken'
    })


    res.status(200).json({
      message:"Success",
      user:{
        ...user._doc, password:''
      },
      accessToken
    })
    
    ;
  } catch (err) {
    console.log(err);
  }
};
