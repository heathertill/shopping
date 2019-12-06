import * as React from 'react';
import { useState, useEffect } from 'react';
import { Item } from './MainView';
import { json } from '../utils/api';
import List from '../components/shared/List';
import SingleList from '../components/admin/SingleList';

export interface AdminViewProps { }

const AdminView: React.SFC<AdminViewProps> = () => {

    const [items, setItems] = useState<Item[]>([]);

    const getItems = async () => {
        try {
            let items = await json('/api/lists');
            setItems(items);
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => { getItems() }, []);

    return (
        <div>
            <div className="row justify-content-between" id="adminView">
                <div className="col-5 bg-light px-3 py-4 mx-0">
                    <h3 className="p-2 text-center">Shopping List</h3>
                    <ul className="list-group list-group-flush mx-0 p-0">
                        {items.map(item => <List key={item.id} item={item} store={item.storeid} id={item.id} user={item.userid} image={item.image} />)}
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