const Joi = require('@hapi/joi');


module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) return res.status(400).send(result.error)
            if (!req.value) {
                req.value = {}
            }
            req.value['body'] = result.value;
            next();
        }
    },

    SingleFieldValidator: (Schema, field) => {
        const result = Joi.validate(field, Schema);
        return result;
    },


    schemas: {
        signUpSchema: Joi.object().keys({
            // username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            fullName: Joi.string().min(3).required()
        }),
        emailSchema: Joi.object().keys({
            email: Joi.string().email({ minDomainSegments: 2 })
        }),

        authSchema: Joi.object().keys({
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            password: Joi.string().required()
        }),
        productSchema: Joi.object().keys({
            title: Joi.string().required().min(3)
        })
    }


}