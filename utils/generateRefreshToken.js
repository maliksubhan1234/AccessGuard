import jwt from "jsonwebtoken";

export const refreshToken = (payload) => {
  return jwt.sign(
    {
      user: payload,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );
};