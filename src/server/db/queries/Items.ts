import { connection as knex } from '../index';

// const allItems = () => knex('items').select('items.id', 'items.userid', 'users.name', 'items.item', 'items._created', 'items.purchased').join('users', 'items.userid', '=', 'users.id').orderBy('_created', 'desc');
const allItems = () => knex('items').select('items.id', 'items.userid', 'users.name','users.image', 'items.item', 'items._created', 'items.purchased').join('users', 'items.userid', '=', 'users.id').orderBy('_created', 'desc');
// const oneItem = (id: number) => knex('items').select('items.id', 'items.userid', 'users.name', 'items.item', 'items._created', 'items.purchased').join('users', 'items.userid', '=', 'users.id').orderBy('_created', 'desc').where('items.id', id);
const oneItem = (id: number) => knex('items').select('items.id', 'items.userid', 'users.name', 'users.image', 'items.item', 'items._created', 'items.purchased').join('users', 'items.userid', '=', 'users.id').orderBy('_created', 'desc').where('items.id', id);
// const storeItems = () => knex('items').select('items.id', 'items.userid', 'users.name', 'users.phone', 'items.item','items.storeid', 'stores.store', 'items._created', 'items.purchased').join('users', 'items.userid', '=', 'users.id').join('stores', 'items.storeid', '=', 'stores.id').orderBy('_created', 'desc');
const storeItems = () => knex('items').select('items.id', 'items.userid', 'users.name', 'users.image', 'users.phone', 'items.item','items.storeid', 'stores.store', 'items._created', 'items.purchased').join('users', 'items.userid', '=', 'users.id').join('stores', 'items.storeid', '=', 'stores.id').orderBy('_created', 'desc');
// const oneStoreItems = (id: number) => knex('items').select('items.id', 'items.userid', 'users.name', 'users.phone', 'items.item','items.storeid', 'stores.store', 'items._created', 'items.purchased').join('users', 'items.userid', '=', 'users.id').join('stores', 'items.storeid', '=', 'stores.id').where('items.storeid', '=', id).orderBy('_created', 'desc');
const oneStoreItems = (id: number) => knex('items').select('items.id', 'items.userid', 'users.name', 'users.image', 'users.phone', 'items.item','items.storeid', 'stores.store', 'items._created', 'items.purchased').join('users', 'items.userid', '=', 'users.id').join('stores', 'items.storeid', '=', 'stores.id').where('items.storeid', '=', id).orderBy('_created', 'desc');
const createItem = (itemObject: any) => knex('items').insert(itemObject);
const updateItem = (itemObject: any, id: number) => knex('items').where('id', id).update(itemObject);

const addStoreid = (storeid: number, id: number) => knex('items').where('id', '=', id).update(storeid);
const deleteItem = (id: number) => knex('items').where('id', id).del();

export default {
    allItems,
    oneItem,
    storeItems,
    oneStoreItems,
    createItem,
    updateItem,
    addStoreid,
    deleteItem
}
