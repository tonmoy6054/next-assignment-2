import { Schema, model } from 'mongoose';
import { Address, IUser, Order } from './users/user.interface';
import validator from 'validator';
const AddressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const OrderSchema = new Schema<Order>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<IUser>({
  userId: { type: Number },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => validator.isAlpha(value),
        message: '{VALUE} is not valid',
      },
    },
  },
  age: { type: Number },
  email: {
    type: String,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email type}',
    },
    isActive: {
      type: String,
      enum: { values: ['active', 'inactive'] },
      default: 'active',
    },
    hobbies: {
      type: [String],
    },
    address: {
      type: AddressSchema,
      required: true,
    },
    orders: {
      type: [OrderSchema],
      required: true,
      default: [],
    },
  },
});

export const User = model<IUser>('User', userSchema);
