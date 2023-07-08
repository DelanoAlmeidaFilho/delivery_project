import { celebrate, Segments, Joi } from 'celebrate';

const createUserValidation = celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        password_confirmation: Joi.string()
            .required()
            .valid(Joi.ref('password')),
        phone_number: Joi.string().required(),
        address: Joi.object()
            .keys({
                road: Joi.string().required(),
                number: Joi.string().required(),
                complement: Joi.string().optional(),
                neighborhood: Joi.string().required(),
                cep: Joi.string().required(),
            })
            .required(),
    },
});

export { createUserValidation };
