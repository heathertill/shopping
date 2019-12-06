import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { json, User } from '../../utils/api';
import { GuestUser } from '../../views/MainView';
import { wayToGo} from '../../utils/formService';

export interface AdminNavProps { }

const AdminNav: React.SFC<AdminNavProps> = () => {

    const [showText, setShowText] = useState<boolean>(false);
    const [users, setUsers] = useState<GuestUser[]>([]);
    const [id, setId] = useState(undefined);

    const toShowAdmin = () => {
        if (User.role === 'admin') {
            setShowText(true)
        }
    };

    const handleUsers = async () => {
        try {
            let users = await json('/api/users');
            setUsers(users)
        } catch (e) {
            console.log(e)
        }
    }

    const selectUser = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (id === undefined) {
            wayToGo('Please select a user!')
        } else {
            location.replace(`/guestEdit/${id}`) 
        }
        
    }

    useEffect(() => { handleUsers(), toShowAdmin() }, [])

    return (
        <>
            {showText && <div className="row">
                <ul className="nav col-12 mb-3 py-3 bg-dark justify-content-end">
                    <div className="nav d-flex">
                        <li className="nav-item mx-3 d-flex">
                            <div className="nav-item-prepend">
                                <button className="btn text-white"
                                    onClick={(e) => selectUser(e)}
                                >Edit User</button>
                            </div>
                            <div>
                                <select className="mt-2" value={id}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setId(e.target.value)} >
                                    <option>Select User</option>
                                    {users.map(user => {
                                        return (
                                            <option className="py-3" key={user.id} value={user.id}>{user.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </li>
                        <li className="nav-item mx-3 mt-2">
                            <Link className="text-white " to="/newstore">Add Store</Link>
                        </li>
                        <li className="nav-item mx-3 mt-2">
                            <Link className="text-white" to="/">Main View</Link>
                        </li>
                        <li className="nav item mx-3 mt-2">
                            <Link className="text-white" to="/admin">Admin View</Link>
                        </li>
                    </div>
                </ul>
            </div >}
        </>
    );
}

export default AdminNav;