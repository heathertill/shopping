import * as React from 'react';
import { useState, useEffect } from 'react';
import { json } from '../../utils/api';
import StoreSelector from '../shared/StoreSelector';

export interface FormProps {
    id: number,
    cantsee: any
}

const Form: React.SFC<FormProps> = ({ id, cantsee }) => {

    const [item, setItem] = useState('');
    const [storeid, setStoreid] = useState<number>(undefined);

    const getItem = async () => {
        try {
            let item = await json(`api/items/${id}`);
            setItem(item.item);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => { getItem() }, []);

    const handleText = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            let body = { storeid }
            let result = await json(`api/lists/${id}`, 'PUT', body)

            if (result) {
                cantsee()
                location.reload()
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form className="form-group">
            <label htmlFor="user">{item}</label>
            <StoreSelector handlers={{ setStoreid }} values={{ storeid }} />
            <button className="btn btn-dark m-2" onClick={handleText}>Save Store</button>
            <button className="btn btn-dark m-2" onClick={cantsee}>Close</button>
        </form>
    );
}

export default Form;