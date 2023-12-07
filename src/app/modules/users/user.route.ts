import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getSingleUser);
router.post('/create-user', userController.createUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.put('/:userId/orders', userController.addNewProductInOrder);
router.get('/:userId/orders', userController.allOrderForSpecificUser);
router.get(
  '/:userId/orders/total-price',
  userController.totalPriceOfOrderForSpecificUser,
);
export const userRoutes = router;
