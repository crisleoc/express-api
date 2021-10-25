const faker = require('faker');
const boom = require('@hapi/boom');

class UsersServices {
    constructor() {
        this.users = [];
        this.generate();
    }

    generate() {
        const limit = 100;
        for (let i = 0; i < limit; i++) {
            this.users.push({
                id: this.users.length.toString(),
                name: faker.name.firstName(),
                city: faker.address.city(),
                isBlock: faker.datatype.boolean(),
            });
        }
    }

    async create(data) {
        const newUser = {
            id: (parseInt(this.users[this.users.length - 1].id) + 1).toString(),
            ...data,
        };
        this.users.push(newUser);
        return newUser;
    }

    async find() {
        return this.users;
    }

    async findOne(id) {
        const user = this.users.find((user) => user.id === id);
        if (!user) {
            throw boom.notFound('User not fount');
        }
        if (user.isBlock) {
            throw boom.conflict('User is block');
        }
        return user;
    }

    async findByName(name) {
        const user = this.users.find(
            (user) => user.name.toLowerCase() === name.toLowerCase()
        );
        if (!user) {
            throw boom.notFound('User not fount');
        }
        if (user.isBlock) {
            throw boom.conflict('User is block');
        }
        return user;
    }

    async update(id, changes) {
        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1) {
            throw boom.notFound('Product not fount');
        }
        const user = this.users[index];
        this.users[index] = {
            ...user,
            ...changes,
        };
        return this.users[index];
    }

    async delete(id) {
        const index = this.users.findIndex((user) => user.id == id);
        if (index === -1) {
            throw boom.notFound('Product not fount');
        }
        this.users.splice(index, 1);
        return { id };
    }
}

module.exports = UsersServices;
