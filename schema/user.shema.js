const Joi = require('joi');

const id = Joi.string().alphanum();
const name = Joi.string().min(3).max(15);
const city = Joi.string().min(3).max(15);

const createUserShema = Joi.object({
    name: name.required(),
    city: city.required(),
});

const updateUserShema = Joi.object({
    name: name,
    city: city,
});

const getUserShema = Joi.object({
    id: id.required(),
});

module.exports = { createUserShema, updateUserShema, getUserShema };
