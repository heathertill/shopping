import * as React from 'react';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Item } from '../../views/MainView';
import { json } from '../../utils/api';
import StoreSelector from '../shared/StoreSelector';

export interface singleListProps extends RouteComponentProps { }

const SingleList: React.SFC<singleListProps> = ({ history }) => {

    const [items, setItems] = useState<Item[]>([]);
    const [storeid, setStoreid] = useState<number>(undefined);
    const [storeName, setStoreName] = useState('')


    const handleStore = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setStoreid(storeid);
    };

    const handleSelect = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let id = storeid;
        try {
            let result = await json(`/api/lists/${id}`)
            setItems(result)
            setStoreName(result.store)
            console.log(result, 'and', storeName)
        } catch (e) {
            console.log(e)
        }
    }


    // const handleMessage = async (item: string, phone: string, itemid: number) => {
    //     let message = 'Your requested item, ' + item + ' has been purchased.'
    //     let text = {
    //         to: phone,
    //         body: message
    //     }
    //     try {
    //         let result = await json('/twilio', 'POST', text)
    //         if (result) {
    //             console.log(message)
    //             let done = json(`/api/items/${itemid}`, 'DELETE')
    //             if (done) {
    //                 console.log('item deleted')
    //                 location.reload();
    //             }
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }


    return (
        <section>
            <div>
                <StoreSelector handlers={{ setStoreid, handleStore }} values={{ storeid }} />
                <button className="btn btn-dark m-2" onClick={handleSelect}>Save Store</button>
            </div>
            
            <div className="border shadow">
                <h3>Store list for {storeName}</h3>
                <ul className="list-group list-group-flush p-3">
                    {items.map(item => {
                        return (
                            <li className="list-group-item" key={item.id}>{item.item}</li>
                        )
                    })}
                </ul>
            </div>
        </section>
    );
}

export default SingleList;