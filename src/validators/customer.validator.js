import Joi from '@hapi/joi';

export default {
  store: Joi.object({
    first_name: Joi.string().required(),
    middle_name: Joi.string(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(15).required(),
    phone: Joi.string().min(10).required(),
    status: Joi.string().default('invited'),
  }),

  update: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    status: Joi.number().integer().required(),
  }),

  login: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),

  email : Joi.object({
    email: Joi.string().email().required(),
  }),

  updatePassword : Joi.object({
    old_password: Joi.string().required().label('OldPassword'),
    new_password: Joi.string().min(6).max(15).required().label('Password'),
    confirm_password: Joi.any().equal(Joi.ref('new_password'))
      .required()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} does not match' })
    })
};
