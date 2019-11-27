import * as React from 'react';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { json, SetAccessToken, ClearAccessToken } from '../../utils/api';
import { RouteComponentProps } from 'react-router-dom';
import Image from './Image';
// import { handleImage } from '../../utils/formService';

export interface RegisterProps extends RouteComponentProps { }

const Register: React.SFC<RegisterProps> = ({ history }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerStatus, setRegisterStatus] = useState(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let body = {
            name,
            email,
            password
        }
        try {
            let r = await json('/auth/register', 'POST', body);
            if (r) {
                try {
                    let result = await json('/auth/login', 'POST', body);
                    if (result) {
                        SetAccessToken(result.token, { userid: result.userid, role: result.role });
                        wayToGo()
                    } else {
                        setRegisterStatus(false);
                        ClearAccessToken();
                    }
                } catch (e) {
                    console.log(e)
                }
            } else {
                setRegisterStatus(false);
            }
        } catch (e) {
            console.log(e)
        }
    };

    const wayToGo = () => {
        Swal.fire({
            title: 'Welcome! Let\'s get shopping',
            timer: 1500,
            showConfirmButton: false,
            onClose: () => {
                history.push('/image');
            }
        })
    }

    const registrationError = () => {
    if (registerStatus === false) {
        return <div className="alert alert-danger">There was a problem registering! Please try again.</div>
    }
}

    return (
        <section className="container d-flex justify-content-center">
            <div className="col-md-9 border rounded shadow-lg">
                <form className="form-group p-3"
                    onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                    <label className="mt-2" htmlFor="email">Email</label>
                    <input type="email" className="form-control"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                    <label className="mt-2" htmlFor="password">Password</label>
                    <input type="password" className="form-control"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                    <button type="submit" className="btn btn-dark mt-3">Register</button>
                    {registrationError()}
                </form>
            </div>
        </section>
    );
}

export default Register;