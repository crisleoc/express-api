const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsServices {
    constructor() {
        this.products = [];
        this.generate();
    }

    generate() {
        const limit = 100;
        for (let i = 0; i < limit; i++) {
            this.products.push({
                id: this.products.length.toString(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price()),
                image: faker.image.imageUrl(),
                isBlock: faker.datatype.boolean(),
            });
        }
    }

    async create(data) {
        const newProduct = {
            id: (
                parseInt(this.products[this.products.length - 1].id) + 1
            ).toString(),
            ...data,
        };
        this.products.push(newProduct);
        return newProduct;
    }

    async find() {
        return this.products;
    }

    async findOne(id) {
        const product = this.products.find((item) => item.id === id);
        if (!product) {
            throw boom.notFound('Product not fount');
        }
        if (product.isBlock) {
            throw boom.conflict('Product is block');
        }
        return product;
    }

    async update(id, changes) {
        const index = this.products.findIndex((item) => item.id === id);
        if (index === -1) {
            throw boom.notFound('Product not fount');
        }
        const product = this.products[index];
        this.products[index] = {
            ...product,
            ...changes,
        };
        return this.products[index];
    }

    async delete(id) {
        const index = this.products.findIndex((item) => item.id === id);
        if (index === -1) {
            throw boom.notFound('Product not fount');
        }
        this.products.splice(index, 1);
        return { id };
    }
}

module.exports = ProductsServices;
