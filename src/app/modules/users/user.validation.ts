import Joi from 'joi';

const addressSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

const orderSchema = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});
const joiValidationSchema = Joi.object({
  userId: Joi.number(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullName: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string()
      .required()
      .alphanum()
      .message('{#label} must only contain alphanumeric characters'),
  }),
  age: Joi.number(),
  email: Joi.string().email().message('{#label} must be a valid email'),
  isActive: Joi.string().valid('active', 'inactive').default('active'),
  hobbies: Joi.array().items(Joi.string()),
  address: addressSchema.required(),
  orders: Joi.array().items(orderSchema).default([]),
});

export default joiValidationSchema;
