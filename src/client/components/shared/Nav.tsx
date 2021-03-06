import * as React from 'react';
import { Link } from 'react-router-dom';
import { User, ClearAccessToken } from '../../utils/api';

export interface NavProps { }

const Nav: React.SFC<NavProps> = () => {

    const checkStatus = () => {
        if (User.userid !== null) {
            return <button className="text-white bg-dark border-dark" onClick={() => logout()}>Logout</button>
        } else if (User.userid === null) {
            return <Link className="text-white" to="/login">Login</Link>
        }
    };

    const allowRegister = () => {
        if (User.role === null) {
            return (
                <li className="nav-item mx-3">
                    <Link className="text-white" to="/register">Register</Link>
                </li>
            )
        }
    }

    const logout = () => {
        ClearAccessToken();
        location.reload();
    };

    return (
        <div className="row">
            <ul className="nav col-12 my-3 py-3 bg-dark justify-content-between">
                <div className="nav">
                    <li className="nav-item mx-3">
                        {checkStatus()}
                    </li>
                    <li className="nav-item mx-3">
                        <Link className="text-white" to="/">Home</Link>
                    </li>
                </div>
                {allowRegister()}
            </ul>
            <div className="jumbotron jumbotron-fluid col-12 mb-3">
                <h1 className="text-center">Shopping</h1>
            </div>

        </div>
    );
}

export default Nav;