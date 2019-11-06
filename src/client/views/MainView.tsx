import * as React from 'react';
import { useState, useEffect } from 'react';
import * as io from 'socket.io-client';
import List from '../components/shared/List';
import StoreLists from '../components/shared/StoreLists';
import { json } from '../utils/api';

export interface MainViewProps { };

export interface Item {
    id: number,
    userid: number,
    name: string,
    phone: string,
    item: string,
    storeid: number,
    store: string,
    _created: Date,
    purchased: boolean
};


export interface AllStores {
    id: number,
    store: string
}

const MainView: React.SFC<MainViewProps> = () => {

    const [items, setItems] = useState<Item[]>([]);
    const [stores, setStores] = useState<AllStores[]>([]);

    const getItems = async () => {
        try {
            let items = await json('/api/items');
            setItems(items);
            let stores = await json('/api/stores');
            setStores(stores);
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => { getItems() }, []);

    useEffect(() => {
        let socket = io.connect();
        socket.on('newitem', () => getItems());
        return () => {
            socket.disconnect();
        }
    }, []);

    return (
        <div className="row">
            <div className="col-3 bg-light p-1 mx-0">
                <h3 className="p-2 text-center">Shopping List</h3>
                <ul className="list-group list-group-flush mx-0 p-0">
                    {items.map(item => <List key={item.id} item={item} id={item.id} />)}
                </ul>
            </div>
            <div className="card-deck col-9 justify-content-between p-0 mx-0">
                {stores.map(store => <StoreLists key={store.id} store={store} />)}
            </div>
        </div>
    );
}

export default MainView;