import * as React from 'react';
import { useState, useEffect } from 'react';
import * as io from 'socket.io-client';
import List from '../components/shared/List';
import NewItem from '../components/public/NewItem';
import { json, User } from '../utils/api';

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

    const addNewItem = () => {
        if (User.role !== null) {
            return <NewItem />
        } else if (User.role === null) {
            return (
                <div className="card bg-light p-5">
                    <h3 className="card-title text-center">Please login or register!</h3>
                </div>
            )
        }
    }

    const getItems = async () => {
        try {
            let items = await json('/api/lists');
            setItems(items);
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
        <div className="row justify-content-between">
            <div className="col-5 bg-light p-4 mx-0">
                <h3 className="p-2 text-center">Shopping List</h3>
                <ul className="list-group list-group-flush mx-0 p-0">
                    {items.map(item => <List key={item.id} item={item} store={item.storeid} id={item.id} user={item.userid} />)}
                </ul>
            </div>
            <div className="col-6 ">
                {addNewItem()}
            </div>
        </div>
    );
}

export default MainView;