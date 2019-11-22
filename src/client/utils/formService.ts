import { json } from './api';

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
}

export const handleMessage = async (e: React.MouseEvent<HTMLButtonElement>, message: string, phone: string, itemid: number) => {
    e.preventDefault();
    // let message = 'Your requested item, ' + item + ' has been purchased.'
    let text = {
        to: phone,
        body: message
    }
    try {
        let result = await json('/twilio', 'POST', text)
        if (result) {
            console.log(message)
            let done = json(`/api/items/${itemid}`, 'DELETE')
            if (done) {
                console.log('item deleted')
                location.reload();
            }
        }
    } catch (e) {
        console.log(e)
    }
}

