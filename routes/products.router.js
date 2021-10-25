const express = require('express');
const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
    createProductShema,
    updateProductShema,
    getProductShema,
} = require('../schema/product.shema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
    const products = await service.find();
    res.json(products);
});

router.get('/filter', (req, res) => {
    res.send('Soy un filter');
});

router.get(
    '/:id',
    validatorHandler(getProductShema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await service.findOne(id);
            res.json(product);
        } catch (error) {
            next(error);
        }
    }
);

router.post(
    '/',
    validatorHandler(createProductShema, 'body'),
    async (req, res) => {
        const body = req.body;
        const newProduct = await service.create(body);
        res.status(201).json({
            message: 'created',
            data: newProduct,
        });
    }
);

router.patch(
    '/:id',
    validatorHandler(getProductShema, 'params'),
    validatorHandler(updateProductShema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const product = await service.update(id, body);
            res.json({
                message: 'update',
                product,
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
