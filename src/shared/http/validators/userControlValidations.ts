const { celebrate, Joi } = require('celebrate');

const userControlValidation = celebrate({
    body: Joi.object().keys({
        user_id: Joi.string().required(),
        roles_id: Joi.array().items(Joi.string()).required(),
    }),
});

export { userControlValidation };
