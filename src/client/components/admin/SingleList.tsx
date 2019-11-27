import * as React from 'react';
import { useState } from 'react';
import { Item } from '../../views/MainView';
import { json } from '../../utils/api';
import { handleMessage } from '../../utils/formService';
import StoreSelector from '../shared/StoreSelector';

export interface singleListProps {
    item?: Item
}

const SingleList: React.SFC<singleListProps> = () => {

    const [items, setItems] = useState<Item[]>([]);
    const [storeid, setStoreid] = useState<number>(undefined);
    const [storeName, setStoreName] = useState<string>('');

    const handleSelect = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let id = storeid;
        try {
            let result = await json(`/api/lists/${id}`)
            setItems(result)
            setStoreName(result[0].store)
        } catch (e) {
            console.log(e)
        }
    }

    const handlePurchase = (e: any, item: string, phone: string, id: number) => {
        console.log('your item has been purchased', id)
        let message = 'Your requested item, ' + item + ', has been purchased.'
        handleMessage(e, message, phone, id);
    }

    const handleDelete = (e: any, item: string, phone: string, id: number) => {
        console.log('deleted')
        let message = 'Your requested item, ' + item + ', has been deleted. Please contact admin for further info.';
        handleMessage(e, message, phone, id);
    }

    return (
        <section>
            <div className="card p-3 mx-0 mb-3 shadow">
                <StoreSelector handlers={{ setStoreid }} values={{ storeid }} />
                <button className="btn btn-block btn-dark mx-auto m-2 w-75" onClick={handleSelect}>Show List</button>
            </div>
            <div className="border shadow bg-white">
                <h3 className="d-flex justify-content-center mt-3">Store list for: {storeName}</h3>
                <ul className="list-group list-group-flush p-3">
                    {items.map(item => {
                        return (
                            <li className="list-group-item" key={item.id}>{item.item}
                                <span className="float-right">
                                    <button className="btn btn-dark mx-2"
                                        onClick={(e) => handlePurchase(e, item.item, item.phone, item.id)}
                                    >Confirm</button>
                                    <button className="btn btn-dark mx-2"
                                    onClick={(e) => handleDelete(e, item.item, item.phone, item.id)}>Delete</button>
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    );
}

export default SingleList;