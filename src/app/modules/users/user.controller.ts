import { Request, Response } from 'express';
import { userServices } from './user.service';
import joiValidationSchema from './user.validation';
import { User } from '../user.model';
import bcrypt from 'bcrypt';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    userData.password = hashedPassword;

    const { error, value } = joiValidationSchema.validate(userData);
    const result = await userServices.createUserIntoDb(userData);
    console.log({ error }, { value });
    if (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error,
      });
    }

    const { password, ...userWithoutPassword } = result;
    console.log(password);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: userWithoutPassword,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
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
    const numericUserId = parseInt(userId, 10);
    const result = await userServices.getSingleUserFromDb(numericUserId);
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
    const numericUserId = parseInt(userId, 10);
    const result = await userServices.updateUser(numericUserId, userData);
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
    await userServices.deleteUser(parseInt(userId, 10));
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
    console.log('User after adding order:', { ...user, orders: user.orders });

    res.json({
      success: true,
      message: 'Order created successfully!',
      data: user,
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'server error' });
  }
};

const allOrderForSpecificUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ userId: parseInt(userId, 10) });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      });
    }
    console.log('User orders:', user.orders);
    if (!user.orders || user.orders.length === 0) {
      console.log('No orders found for the user');
      return res.json({
        success: true,
        message: 'No orders found for the user',
        data: { orders: [] },
      });
    }

    const orders = user.orders.map((order) => ({
      productName: order.productName,
      price: order.price,
      quantity: order.quantity,
    }));
    console.log('Mapped orders:', orders);

    res.json({
      success: true,
      message: 'Orders fetched successfully!',
      data: { orders },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      data: null,
    });
  }
};

const totalPriceOfOrderForSpecificUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    const totalPrice =
      user.orders && user.orders.length > 0
        ? user.orders.reduce(
            (total, order) => total + order.price * order.quantity,
            0,
          )
        : 0;

    res.json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Server Error',
      },
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addNewProductInOrder,
  allOrderForSpecificUser,
  totalPriceOfOrderForSpecificUser,
};
