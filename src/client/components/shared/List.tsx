import * as React from 'react';
import { Item } from '../../views/MainView';
import useModal from '../../utils/useModal';
import CustomModal from '../public/CustomModal';
import { User } from '../../utils/api'

export interface ListProps {
    item: Item,
    id: number,
    store: number,
    user: number,
    image: string
}

// const List: React.SFC<ListProps> = ({ item: { id, item }, store }) => {
    const List: React.SFC<ListProps> = ({ item: { id, item, image }, store }) => {

    const { isShowing, toggle } = useModal();

    const isAllowed = () => {
        if (User.role === 'admin') {
            return <button onClick={toggle} className="btn btn-dark btn-sm">Store</button>
        }
    }

    const alertItem = () => {
        return (
            <span className="d-flex justify-content-between">
                <div id="avatarDiv">
                    <img className="" src={image} alt="" id="avatar" />
                </div>
                <p className="m-0 p-2" id={`store${store}`}>{item}</p>
            </span>

        )
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