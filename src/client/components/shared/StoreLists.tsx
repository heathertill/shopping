import * as React from 'react';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { json, User } from '../../utils/api';
import { AllStores, Item } from '../../views/MainView';
import * as io from 'socket.io-client';


export interface StoreListsProps {
    store: AllStores
}

const StoreLists: React.SFC<StoreListsProps> = ({ store: { id, store } }) => {


    const [items, setItems] = useState<Item[]>([]);

    let itemList = items.filter(obj => obj.storeid == id)

    const getItems = async () => {
        try {
            let items = await json('/api/lists');
            setItems(items);
        } catch (e) {
            console.log(e);
        }
    }

    const toList = () => {
            if (User.role === 'admin') {
                return <Link to={`/singleList/${id}`} className="card-header bg-light text-black d-flex w-100" id="list">{store}</Link>
        }
    }

    const notToList = () => {
        if (User.role !== 'admin') {
            return <div className="card-header bg-light d-flex w-100" id="list">{store}</div>
        }
    }

    useEffect(() => { getItems() }, []);

    useEffect(() => {
        let socket = io.connect();
        socket.on('update', () => getItems());
        return () => {
            socket.disconnect();
        }
    }, [])

    return (
        <div className="storeCard card ml-3 mr-0" id="storeLists" key={id}>
            {toList()}
            {notToList()}
            <ul className="list-group list-group-flush p-3">
                {itemList.map(item => {
                    return (
                        <li className="list-group-item" key={item.id}>{item.item}</li>
                    )
                })}
            </ul>
        </div>
    );
}

export default StoreLists;

