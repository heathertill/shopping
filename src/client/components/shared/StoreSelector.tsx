import * as React from 'react';
import { useState, useEffect } from 'react';
import { json } from '../../utils/api';


export interface StoreSelectorProps {
    handlers: {
        setStoreid: any,
        handleStore: any
    };
    values: {
        storeid: number
    }
}

export interface Store {
    id: number,
    store: string
}

const StoreSelector: React.SFC<StoreSelectorProps> = ({ handlers, values }) => {

    const [stores, setStores] = useState<Store[]>([]);


    const getStores = async () => {
        try {
            let stores = await json('/api/stores')
            setStores(stores);
            console.log('stores', stores)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => { getStores() }, [])

    return (
        <>
            <div className="form-inline row m-2">
                <select className="form-control col mr-2" value={values.storeid}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handlers.setStoreid(Number(e.target.value))}>
                    <option>Select a Store</option>
                    {stores.map(store => {
                        return (
                            <option key={store.id} value={store.id}>{store.store}</option>
                        )
                    })}
                </select>
            </div>
        </>
    );
}

export default StoreSelector;