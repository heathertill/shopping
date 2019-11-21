import * as React from 'react';
import { useState, useEffect } from 'react';
import { Item, AllStores } from './MainView';
import { json, User } from '../utils/api';
import List from '../components/shared/List';
import StoreLists from '../components/shared/StoreLists';
import NewStore from '../components/admin/NewStore';
import AdminNav from '../components/admin/AdminNav';

export interface AdminViewProps { }

const AdminView: React.SFC<AdminViewProps> = () => {

    const [items, setItems] = useState<Item[]>([]);
    const [stores, setStores] = useState<AllStores[]>([]);

    let storeList = stores.filter(obj => obj.id > 0)

    const adminNav = () => {
        if (User.role === 'admin') {
            return <AdminNav />
        }
    }

    const getItems = async () => {
        try {
            let items = await json('/api/lists');
            setItems(items);
            let stores = await json('/api/stores');
            // setStores(stores);
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => { getItems() }, []);

    return (
        <div>
            <AdminNav />
            <div className="row" id="adminView">
                <div className="col-3 bg-light p-1 mx-0">
                    <h3 className="p-2 text-center">Shopping List</h3>
                    <ul className="list-group list-group-flush mx-0 p-0">
                        {items.map(item => <List key={item.id} item={item} store={item.storeid} id={item.id} />)}
                    </ul>
                </div>
                <div className="card-deck col-9 justify-content-between p-0 mx-0">
                    <div>
                        {storeList.map(store => <StoreLists key={store.id} store={store} />)}
                    </div>
                    <div className="card">
                        {/* <NewStore /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminView;