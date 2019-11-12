import * as React from 'react';
import { Item } from '../../views/MainView';
import useModal from '../../utils/useModal';
import CustomModal from '../public/CustomModal';
import { User } from '../../utils/api'

export interface ListProps {
    item: Item,
    id: number,
    store: number
}

const List: React.SFC<ListProps> = ({ item: { id, item }, store }) => {

    const { isShowing, toggle } = useModal();

    const isAllowed = () => {
        if (User.role === 'admin') {
            return <button onClick={toggle} className="btn btn-dark btn-sm">Store</button>
        }
    }

    const alertItem = () => {
    if (User.role === 'admin') {
        return <p className="m-0 p-2" id={`store${store}`}>{item}</p>
    } else {
        return <p className="m-0 p-2">{item}</p>
    }
}




    return (
        <li className="list-group-item px-0 bg-light">
            <div className="d-flex w-100 justify-content-between">
                {alertItem()}
                {/* <p className="m-0 p-2" id={`store${store}`}>{item}</p> */}
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