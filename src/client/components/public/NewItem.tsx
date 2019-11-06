import * as React from 'react';
import { useState } from 'react';
import { User, json } from '../../utils/api';

export interface NewItemProps { }

const NewItem: React.SFC<NewItemProps> = () => {

    const [item, setItem] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let newItem = {
            userid: User.userid,
            item
        }
        try {
            let result = await json('/api/items', 'POST', newItem)
            if (result) {
                location.reload();
            } else {
                return <div className="alert">There was a problem! Please try again.</div>
            }
        } catch (e) {
            console.log(e)
        }
    };



    return (
        <section className="bg-light mb-3 mx-n3 p-5">
            <form className="form-group"
                onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="item" className="mt-2">Add an Item</label>
                <input type="text" className="form-control"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItem(e.target.value)} />
                <button type="submit" className="btn btn-secondary btn-block mt-4">Submit</button>
            </form>
        </section>
    );
}

export default NewItem;