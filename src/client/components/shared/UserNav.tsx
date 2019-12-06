import * as React from 'react';
import { useState, useEffect } from 'react';
import { User } from '../../utils/api';
import { Link } from 'react-router-dom';

export interface UserNavProps { }

const UserNav: React.SFC<UserNavProps> = () => {

    const [showNav, setShowNav] = useState<boolean>(false);

    const toShowNav = () => {
        if (User.role === 'guest') {
            setShowNav(true);
        }
    }

    useEffect(() => { toShowNav() }, [])

    return (
        <>
            {showNav && <div className="row">
                <ul className="nav col-12 mb-3 py-3 bg-dark justify-content-end">
                    <div className="nav">
                        <li className="nav-item mx-3">
                            {showNav && <Link className="text-white " to={`/guestEdit/${User.userid}`}>Edit Profile</Link>}
                        </li>
                        {/* <li className="nav-item mx-3">
                        {showNav && <Link className="text-white " to="/newstore">Add Store</Link>}
                    </li> */}
                        <li className="nav-item mx-3">
                            {showNav && <Link className="text-white" to="/">Main View</Link>}
                        </li>
                        {/* <li className="nav item mx-3">
                        {showNav && <Link className="text-white" to="/admin">Admin View</Link>}
                    </li> */}
                    </div>
                </ul>
            </div >}
            {/* {!showNav &&
                <div className="row">
                    <ul className="nav col-12 mb-3 py-3 bg-dark justify-content-end">

                    </ul>
                </div>
            } */}
        </>
    );
}

export default UserNav;