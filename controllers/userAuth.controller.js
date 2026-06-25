import express from "express";
import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { accessToken } from "../utils/generateAccessToken.js";
import { refreshToken } from "../utils/generateRefreshToken.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Email or Password" });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Email or Password" });
    }
    const access = accessToken(user._id);
    const refresh = refreshToken(user._id);
    user.refreshToken = refresh;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      accessToken: access,
      refreshToken: refresh,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "Refresh Token Missing" });
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    if (user.refreshToken !== refreshToken) {
      return res.status(403).json({
        success: false,
        message: "Invalid Refresh Token",
      });
    }
    const newAccessToken = accessToken(user._id);

    return res.status(200).json({
      success: true,
      message: "New Access Token Generated",
      accessToken: newAccessToken,
    });
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Refresh Token Expired or Invalid",
      error: err.message,
    });
  }
};

export const logout = async (req, res) => {
  const { refreshToken } = req.body;

  const user = await User.findOne({
    refreshToken,
  });

  if (user) {
    user.refreshToken = null;
    await user.save();
  }

  return res.status(200).json({
    success: true,
    message: "Logout Successful",
  });
};
