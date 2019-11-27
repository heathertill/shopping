import { json } from './api';
import Swal from 'sweetalert2';

export const handleStores = async (setStores: any) => {
    try {
        let result = await json('/api/stores')
        setStores(result)
    } catch (e) {
        console.log(e)
    }
};

export const handleItems = async (setItems: any) => {
    try {
        let items = await json('/api/lists');
        setItems(items);
    } catch (e) {
        console.log(e);
    }
};

export const handleMessage = async (e: React.MouseEvent<HTMLButtonElement>, message: string, phone: string, itemid: number) => {
    e.preventDefault();
    let text = {
        to: phone,
        body: message
    }
    try {
        let result = await json('/twilio', 'POST', text)
        if (result) {
            let done = json(`/api/items/${itemid}`, 'DELETE')
            if (done) {
                console.log('item deleted')
                location.reload();
            }
        }
    } catch (e) {
        console.log(e)
    }
};

export const wayToGo = (then: any) => {
    Swal.fire({
        title: 'Way to go! Let\'s get Shopping!',
        timer: 1000,
        showConfirmButton: false,
        onClose: () => {
            then;
        }
    })
}

export const getUser = async (user: number, setUser: any) => {
    try {
        let result = await json(`/api/users/${user}`)
        setUser(result)
    } catch (e) {
        console.log(e)
    }
}
