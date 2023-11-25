import { Request, Response } from 'express';
import { userServices } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const result = await userServices.createUserIntoDb(userData);
    res.status(200).json({
      success: true,
      message: ' user created successfully',
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
      message: 'user retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const userController = {
  createStudent,
  getAllUsers,
};
