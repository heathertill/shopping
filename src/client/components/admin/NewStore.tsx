import * as React from 'react';
import { useState, useEffect } from 'react';
import { json } from '../../utils/api';
import { handleStores } from '../../utils/formService';
import { Store } from '../shared/StoreSelector';

export interface NewStoreProps {
}

const NewStore: React.SFC<NewStoreProps> = () => {


    const [stores, setStores] = useState<Store[]>([])
    const [newStore, setNewStore] = useState('');

    let list = stores.filter(obj => obj.id > 0);

    const storeList = () => {
        handleStores(setStores)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let body = {
            store: newStore
        }
        try {
            let newStore = await json('/api/stores', 'POST', body)
            if (newStore) {
                console.log('new store created')
                location.reload();
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        try {
            let result = json(`/api/stores/${id}`, 'DELETE');
            if (result) {
                console.log('store deleted')
                location.reload();
            }
        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => { storeList() }, []);

    return (
        <section>
            <div className="container d-flex justify-content-center">
                <div className="col-md-8 border rounded shadow-lg">
                    <h3 className="text-center m-3">Manage Stores</h3>
                    <ul className="list-group list-group-flush p-3">
                        {list.map(store => {
                            return (
                                <div className="d-flex justify-content-between" key={store.id}>
                                    <li className="list-group-item d-inline col-12">{store.store}
                                        <button className="btn btn-dark btn-sm d-inline float-right"
                                            onClick={(e) => handleDelete(e, store.id)}>Delete Store</button>
                                    </li>
                                </div>
                            )
                        })}
                    </ul>
                    <form className="form-group p-3" onSubmit={(e) => handleSubmit(e)}>

                        <div>
                            <h4>Add a store:</h4>
                            <label htmlFor="store">Store Name</label>
                            <input type="text" className="form-control"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewStore(e.target.value)} />
                            <button type="submit" className="btn btn-dark mt-3">Add Store</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>

    );
}

export default NewStore;