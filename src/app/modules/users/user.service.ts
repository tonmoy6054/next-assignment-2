import { User } from '../user.model';
import { IUser } from './user.interface';

const createUserIntoDb = async (user: IUser) => {
  const result = await User.create(user);
  return result;
};

const getAllUserFromDb = async () => {
  const result = await User.find();
  return result;
};
const getSingleUserFromDb = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};
const updateUser = async (
  userId: number,
  userData: IUser,
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate(userId, userData, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteUser = async (userId: number) => {
  const result = await User.findByIdAndDelete(userId);
  return result;
};

export const userServices = {
  createUserIntoDb,
  getAllUserFromDb,
  getSingleUserFromDb,
  updateUser,
  deleteUser,
};
