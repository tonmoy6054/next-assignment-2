import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/create-user', userController.createStudent);
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getSingleUser);

export const userRoutes = router;
