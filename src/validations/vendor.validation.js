const Joi = require("joi");
const mongoose = require("mongoose");

const objectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  category: Joi.string().required(),
});

const updateProductSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number().positive(),
  stock: Joi.number().integer().min(0),
  category: Joi.string(),
}).min(1); 

const deleteProductSchema = Joi.object({
  productId: Joi.string().custom(objectId).required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
};
