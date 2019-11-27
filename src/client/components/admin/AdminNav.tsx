import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Store } from '../shared/StoreSelector';
import { json, User } from '../../utils/api';

export interface AdminNavProps {
}

const AdminNav: React.SFC<AdminNavProps> = () => {

    const [showText, setShowText] = useState<boolean>(false);

    const toShow = () => {
        if (User.role === 'admin') {
            setShowText(true)
        }
    }

    useEffect(() => { toShow() }, []);

    return (
        <div className="row">
            <ul className="nav col-12 mb-3 py-3 bg-dark justify-content-end">
                <div className="nav">
                <li className="nav-item mx-3">
                        {showText && <Link className="text-white " to="/image">Image</Link>}
                    </li>
                    <li className="nav-item mx-3">
                        {showText && <Link className="text-white " to="/newstore">Add Store</Link>}
                    </li>
                    <li className="nav-item mx-3">
                        {showText && <Link className="text-white" to="/">Main View</Link>}
                    </li>
                    <li className="nav item mx-3">
                        {showText && <Link className="text-white" to="/admin">Admin View</Link>}
                    </li>
                </div>

            </ul>
        </div >
    );
}

export default AdminNav;