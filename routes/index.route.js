import express from "express";
import userRoutes from './user/user.route.js';
import authRoute from './user/userAuth.route.js';
const router = express.Router();

router.use("/user", userRoutes);
router.use('/auth',authRoute);

export default router;
