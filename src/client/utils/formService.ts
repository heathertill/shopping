import { json } from './api';

export const getStores = async <T = any>(setStores: any) => {
    try {
        let result = await json('/api/stores')
        setStores(result)
    } catch (e) {
        console.log(e)
    }
}

export const handleMessage = async (item: string, phone: string, itemid: number) => {
    let message = 'Your requested item, ' + item + ' has been purchased.'
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