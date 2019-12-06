import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { getUser, handleUserUpdate } from '../../utils/formService';
import { User } from '../../utils/api';
import { GuestUser } from '../../views/MainView';

export interface GuestEditUserProps extends RouteComponentProps<{ id: string }> { }

const GuestEditUser: React.SFC<GuestEditUserProps> = ({ match: { params: { id } } }) => {

    const [user, setUser] = useState<GuestUser>({
        id: undefined,
        name: '',
        email: '',
        phone: '',
        image: '',
        role: ''
    })

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');

    const handleUsers = () => {
        getUser(setUser, Number(id))
    }

    useEffect(() => { handleUsers() }, [])

    const handleRole = () => {
        if (User.role === 'admin') {
            return (
                    <div>
                        <label className="mt-2" htmlFor="email">Role</label>
                        <input type="text" className="form-control" value={role} placeholder={user.role}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole(e.target.value)} />
                        <button type="submit" className="btn btn-dark my-3"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleUserUpdate(e, Number(id), { role: role })}
                        >Update Role</button>
                    </div>
            )
        }
    }

    return (
        <section className="container d-flex justify-content-center mb-5">
            <div className="col-md-9 border rounded shadow-lg">
                <h3 className="text-center mt-3">Edit Profile</h3>
                <form className="form-group p-3">
                    <div className="mt-3">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" value={name} placeholder={user.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                        <button type="submit" className="btn btn-dark my-3"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleUserUpdate(e, Number(id), { name: name })}
                        >Update Name</button>
                    </div>
                    <div className="mt-3">
                        <label className="mt-2" htmlFor="email">Email</label>
                        <input type="email" className="form-control" value={email} placeholder={user.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                        <button type="submit" className="btn btn-dark my-3"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleUserUpdate(e, Number(id), { email: email })}
                        >Update Email</button>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        <div className="col-5 p-0 mt-3">
                            <label className="mt-2" htmlFor="email">Phone</label>
                            <input type="tel" className="form-control width-50" value={phone} placeholder={user.phone}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)} />
                            <button type="submit" className="btn btn-dark my-3"
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleUserUpdate(e, Number(id), { phone: phone })}
                            >Update Phone</button>
                        </div>
                        <div className="col-5">
                            <div className="text-center">
                                <div className="">
                                    <img src={user.image} alt="test" id="test" />
                                </div>
                                <Link className="btn btn-dark mt-2" to="/image">Change Image</Link>
                            </div>
                        </div>
                    </div>
                    {handleRole()}
                </form>
            </div>
        </section>
    );
}

export default GuestEditUser;