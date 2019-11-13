import * as React from 'react';
import {Link} from 'react-router-dom';
import StoreLists from '../shared/StoreLists';

export interface AdminNavProps { }

const AdminNav: React.SFC<AdminNavProps> = () => {



    return (
        <div className="row">
            <ul className="nav col-12 mb-3 py-3 bg-dark justify-content-between">
                <div className="nav">
                    <li className="nav-item mx-3">
                        <Link className="text-white" to="/newstore">Add Store</Link>
                    </li>
                    <li className="nav-item mx-3">
                        <Link className="text-white" to="/">Home</Link>
                    </li>
                    {/* {adminView()} */}
                </div>
                <li className="nav item mx-3">
                    <Link className="text-white" to="/register">Register</Link>
                </li>
            </ul>
        </div>
    );
}

export default AdminNav;