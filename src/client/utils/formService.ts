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

export const wayToGo = (message?: string, then?: any) => {
    Swal.fire({
        title: message,
        timer: 1500,
        showConfirmButton: false,
        onClose: () => {
            then;
        }
    })
}

export const getUser = async (setUser: any, userid?: number) => {
    try {
        if (userid) {
            let user = await json(`/api/users/${userid}`)
            setUser(user)
        } else {
            let user = await json('/api/users')
            setUser(user)
        }
            
    } catch (e) {
        console.log(e)
    }
}

export const handleUserUpdate = async (e: React.MouseEvent<HTMLButtonElement>, userid: number, object: any) => {
    e.preventDefault();
    let body = {
        object
    }
    console.log('ding')
    console.log('fosv body', body.object)
    try {
        let result = await json(`/api/users/${userid}`, 'PUT', body.object)
        if (result) {
            wayToGo('Updated')
            console.log(result)
        }
    } catch (e) {
        console.log(e)
    }
}
