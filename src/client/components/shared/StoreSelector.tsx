import * as React from 'react';
import { useState, useEffect } from 'react';
import { handleStores } from '../../utils/formService';

export interface StoreSelectorProps {
    handlers: {
        setStoreid: any
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

    const storeList = stores.filter(obj => obj.id > 0)

    const getStores = () => {
        handleStores(setStores)
    }

    useEffect(() => { getStores() }, [])

    return (
        <>
            <div className="form-inline row m-2">
                <select className="form-control col" value={values.storeid}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handlers.setStoreid(Number(e.target.value))}>
                    <option>Select a Store</option>
                    {storeList.map(store => {
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