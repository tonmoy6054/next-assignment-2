import { Request, Response } from 'express';
import { userServices } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const result = await userServices.createUserIntoDb(userData);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
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

export const userController = {
  createStudent,
  getAllUsers,
  getSingleUser,
};
