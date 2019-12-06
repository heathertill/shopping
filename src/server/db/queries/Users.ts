import { connection as knex } from '../index';

const getUsers = () => knex('users').select();
const findOneByEmail = (email: string) => knex('users').where('email', email).select().limit(1);
const findOneById = (id: number) => knex('users').select().where('id', id);
const createUser = (userObject: any) => knex('users').insert(userObject);
const deleteUser = (id: number) => knex('users').where('id', id).del();
const addImage = (image: string, id: number) => knex('users').where('id', id).update(image)

export default {
    getUsers,
    findOneByEmail,
    findOneById,
    createUser,
    deleteUser,
    addImage
}