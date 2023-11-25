import { Request, Response } from 'express';
import { userServices } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await userServices.createUserIntoDb(user);
    res.status(200).json({
      success: true,
      message: ' user created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const userController = {
  createStudent,
};
