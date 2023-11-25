import { Schema, model, connect } from 'mongoose';
import { IUser, Order } from './users/user.interface';

const OrderSchema = new Schema<Order>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<IUser>({
  userId: { type: Number },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number },
  email: { type: String },
  isActive: ['active', 'inactive'],
  hobbies: {
    type: [String],
  },
  address: {
    type: {
      street: String,
      city: String,
      country: String,
    },
    required: true,
  },
  orders: {
    type: [OrderSchema],
    required: true,
    default: [],
  },
});
