import { Request, Response } from 'express';
import { userServices } from './user.service';
import joiValidationSchema from './user.validation';
import { User } from '../user.model';

const createStudent = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const { error, value } = joiValidationSchema.validate(userData);
    const result = await userServices.createUserIntoDb(userData);
    console.log({ error }, { value });
    if (error) {
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        error: error,
      });
    }

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUserFromDb();
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getSingleUserFromDb(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const { userId } = req.params;
    const result = await userServices.updateUser(userId, userData);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await userServices.deleteUser(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
    });
  } catch (err) {
    console.log(err);
  }
};

const addNewProductInOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const { productName, price, quantity } = req.body;
    const newOrder = {
      productName,
      price,
      quantity,
    };
    if (user.orders && user.orders.length > 0) {
      user.orders.push(newOrder);
    } else {
      user.orders = [newOrder];
    }
    await user.save();
    res.json({
      success: true,
      message: 'Order created successfully!',
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'server error' });
  }
};

export const userController = {
  createStudent,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addNewProductInOrder,
};
