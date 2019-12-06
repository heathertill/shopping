import * as React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { json, SetAccessToken, ClearAccessToken } from '../../utils/api';

export interface LoginProps { }

const Login: React.SFC<LoginProps> = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logStatus, setLogStatus] = useState(true);

    const notAllowed = () => {
        if (!logStatus) {
            Swal.fire({
                title: 'Invalid Credentials!',
                showConfirmButton: false,
                timer: 1500,
                onClose: () => {
                    location.reload();
                }
            })
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let result = await json('/auth/login', 'POST', {
                email,
                password
            });
            if (result) {
                SetAccessToken(result.token, { userid: result.userid, role: result.role })
                if (result.role) {
                    setLogStatus(true);
                    location.replace('/')
                }
            } else {
                setLogStatus(false);
                ClearAccessToken();
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <section className="container d-flex justify-content-center">
            <div className="col-md-8 border rounded shadow-lg">
                <form className="form-group p-3"
                    onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                    <label className="mt-2" htmlFor="password">Password</label>
                    <input type="password" className="form-control"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                    <button type="submit" className="btn btn-dark mt-3">Login</button>
                    {notAllowed()}
                </form>
            </div>
        </section>
    );
}

export default Login;