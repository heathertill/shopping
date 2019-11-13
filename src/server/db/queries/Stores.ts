import { connection as knex } from '../index';

const allStores = () => knex('stores').select();
const oneStore = (id: number) => knex('stores').select().where('id', id);
const storeList = (id: number) => knex('stores').select('stores.store', 'items.id as itemid', 'items.userid', 'stores.id as storeid', 'items.item', 'items._created').join('items', 'stores.id', '=', 'items.storeid').where('items.storeid', id);
const newStore = (storeObject: any) => knex('stores').insert(storeObject);
const deleteStore = (id: number) => knex('stores').where('id', id).del();


export default {
    allStores,
    oneStore,
    newStore,
    deleteStore,
    // storeList
}


