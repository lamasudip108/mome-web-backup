import Joi from '@hapi/joi';

export default {
  store: Joi.object({
    first_name: Joi.string().required(),
    middle_name: Joi.string(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(15).required(),
    phone: Joi.string().min(10).max(10).required(),
    status: Joi.string().default('pending'),
  }),

  update: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(10).required(),
    street : Joi.string().required(),
    city: Joi.string().required(),
    province: Joi.string().required(),
    post_box: Joi.string().required()
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
    }),

  addBank: Joi.object({
    bank_id: Joi.string().required(),
    branch_name: Joi.string().required(),
    account_holder: Joi.string().required(),
    account_number: Joi.string().required(),
  }),

  sendMoney: Joi.object({
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(10).required(),
    amount: Joi.number().required(),
    description : Joi.string().max(50),
  }),

  respondRequest:Joi.object({
    request_id: Joi.number().required(),
    status: Joi.number().required(),
  })

};
