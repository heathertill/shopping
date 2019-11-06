import * as React from 'react';
import { useState } from 'react';
import { json, SetAccessToken, ClearAccessToken } from '../../utils/api';
import { RouteComponentProps } from 'react-router-dom';

export interface LoginProps extends RouteComponentProps { }

const Login: React.SFC<LoginProps> = ({ history }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logStatus, setLogStatus] = useState(true);

    const notAllowed = () => {
        if (!logStatus) {
            return <div className="alert alert-danter p-1 m-3">Invalid Credentials</div>
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('email', email, 'password', password)
        try {
            let result = await json('/auth/login', 'POST', {
                email,
                password
            });
            if (result) {
                SetAccessToken(result.token, { userid: result.userid, role: result.role })
                if (result.role) {
                    setLogStatus(true);
                    history.push('/');
                    location.reload();
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