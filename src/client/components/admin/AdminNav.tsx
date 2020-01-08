import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import StoreLists from '../shared/StoreLists';
import { Store } from '../shared/StoreSelector';
import { json } from '../../utils/api';

export interface AdminNavProps {
    // store: Store
}

const AdminNav: React.SFC<AdminNavProps> = () => {

    const [stores, setStores] = useState<Store[]>([]);
    const storeList = stores.filter(obj => obj.id > 0);

    const getStores = async () => {
        try {
            let stores = await json('/api/stores');
            setStores(stores)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => { getStores() }, [])

    return (
        <div className="row">
            <ul className="nav col-12 mb-3 py-3 bg-dark justify-content-between">
                <div className="nav">
                    <li className="nav-item mt-2 mx-3">
                        <Link className="text-white " to="/newstore">Add Store</Link>
                    </li>
                    <li className="nav-item mt-2 mx-3">
                        <Link className="text-white " to="/singleList">One List</Link>
                    </li>
                    <li className="nav-item mx-3 mt-2">
                        <Link className="text-white" to="/">Home</Link>
                    </li>
                    {/* {adminView()} */}
                </div>
                <li className="nav item mx-3">
                    {/* <Link className="text-white" to="/register">Register</Link> */}
                </li>
            </ul>
        </div >
    );
}

export default AdminNav;