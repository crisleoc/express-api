const boom = require('@hapi/boom');

function validatorHandler(shema, property) {
    return (req, res, next) => {
        const data = req[property];
        const { error } = shema.validate(data, { abortEarly: false });
        if (error) {
            next(boom.badRequest(error));
        }
        next();
    };
}

module.exports = validatorHandler;
