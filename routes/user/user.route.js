import express from 'express'
import { createUser, deleteUser, getUser, updateUser } from '../../controllers/user.controller.js';
import { verificationMiddleware } from '../../middleware/authMiddleware.js';
const router=express.Router();

router.post('/create-user',createUser);
router.get('/get-user/:id',verificationMiddleware,getUser);
router.put('/update-user/:id',verificationMiddleware,updateUser);
router.delete('/delete-user/:id',verificationMiddleware,deleteUser);

export default router;