import * as React from 'react';
import { Item } from '../../views/MainView';
import useModal from '../../utils/useModal';
import CustomModal from '../public/CustomModal';
import { User } from '../../utils/api'
import { useState } from 'react';
import { getUser } from '../../utils/formService';
import { useEffect } from 'react';
import { number } from 'prop-types';

export interface ListProps {
    item: Item,
    id: number,
    store: number,
    user: number
}

interface Avatar {
    id: number,
    image: string
}

const List: React.SFC<ListProps> = ({ item: { id, item }, store }) => {

    const { isShowing, toggle } = useModal();

    const [user, setUser] = useState<Avatar[]>([])

    useEffect(() => { getUser(User.userid, setUser) }, [])

    const getImage = (user: number, setUser: any) => {
        let result = getUser(user, setUser)
        
if (result) {
    // return user.image
}


    }


    const isAllowed = () => {
        if (User.role === 'admin') {
            return <button onClick={toggle} className="btn btn-dark btn-sm">Store</button>
        }
    }



    const alertItem = () => {
        if (User.role === 'admin') {
            return (
                <span className="d-flex justify-content-between">
                    <img className="" src="https://heathers-projects.s3.amazonaws.com/shoppingImage-IMG_3370.JPG" alt="" id="avatar" />
                    <p className="m-0 p-2" id={`store${store}`}>{item}</p>
                </span>

            )
        } else {
            return <p className="m-0 p-2">{item}</p>
        }
    }




    return (
        <li className="list-group-item px-0 bg-light">
            <div className="d-flex w-100 justify-content-between">
                {alertItem()}
                {isAllowed()}
                <CustomModal
                    isShowing={isShowing}
                    hide={toggle}
                    id={id}
                />
            </div>
        </li>
    );
}

export default List;