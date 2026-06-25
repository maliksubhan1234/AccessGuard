import express from "express";
import jwt from 'jsonwebtoken'

export const accessToken = (payload) => {
    return jwt.sign(
      {
        user: payload,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      },
    );
};
