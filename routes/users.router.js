const express = require('express');
const UsersServices = require('../services/user.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
    createUserShema,
    updateUserShema,
    getUserShema,
} = require('../schema/user.shema');

const router = express.Router();
const service = new UsersServices();

router.get('/', async (req, res) => {
    const users = await service.find();
    res.json(users);
});

router.get(
    '/:id',
    validatorHandler(getUserShema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await service.findOne(id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    '/n/:userName',
    validatorHandler(getUserShema, 'params'),
    async (req, res, next) => {
        try {
            const { userName } = req.params;
            const usersFound = await service.findByName(userName);
            res.json(usersFound);
        } catch (error) {
            next(error);
        }
    }
);

router.post(
    '/',
    validatorHandler(createUserShema, 'body'),
    async (req, res) => {
        const body = req.body;
        const newUser = await service.create(body);
        res.status(201).json({
            message: 'created',
            data: newUser,
        });
    }
);

router.patch(
    '/:id',
    validatorHandler(getUserShema, 'params'),
    validatorHandler(updateUserShema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const user = await service.update(id, body);
            res.json({
                message: 'update',
                user,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const rta = await service.delete(id);
        res.json({
            message: 'delete',
            rta,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
