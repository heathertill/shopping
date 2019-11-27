import * as React from 'react';
import { useState, useEffect } from 'react';
import { Item, AllStores } from './MainView';
import { json, User } from '../utils/api';
import List from '../components/shared/List';
import SingleList from '../components/admin/SingleList';

export interface AdminViewProps { }

const AdminView: React.SFC<AdminViewProps> = () => {

    const [items, setItems] = useState<Item[]>([]);
    // const [stores, setStores] = useState<AllStores[]>([]);

    // let storeList = stores.filter(obj => obj.id > 0)

    const getItems = async () => {
        try {
            let items = await json('/api/lists');
            setItems(items);
            // let stores = await json('/api/stores');
            // setStores(stores);
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => { getItems() }, []);

    return (
        <div>
            <div className="row justify-content-between" id="adminView">
                <div className="col-5 bg-light p-4 mx-0">
                    <h3 className="p-2 text-center">Shopping List</h3>
                    <ul className="list-group list-group-flush mx-0 p-0">
                        {items.map(item => <List key={item.id} item={item} store={item.storeid} id={item.id} />)}
                    </ul>
                </div>
                <div className="d-flex col-6 bg-light justify-content-center p-0">
                    <div className="card-body p-4">
                        <SingleList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminView;