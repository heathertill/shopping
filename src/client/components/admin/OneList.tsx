// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import { AllStores, Item } from '../../views/MainView';
// import { json } from '../../utils/api';
// import { handleMessage } from '../../utils/formService';

// export interface OneListProps {
//     store: AllStores,
//     item: Item
//     values: {
//         item: string,
//         phone: string,
//         itemid: number
//     }
// }

// const OneList: React.SFC<OneListProps> = ( {values}) => {


//         const [items, setItems] = useState<Item[]>([]);
//         const [store, setStore] = useState('');
    
//         const getList = async () => {
//             try {
//                 let items = await json(`/api/lists/${id}`);
//                 setItems(items);
//                 setStore(items[0].store)
//             } catch (e) {
//                 console.log(e);
//             }
//         };
    
//     // const sendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
//     //     handleMessage();
//     // } 
    
//         // const handleMessage = async (item: string, phone: string, itemid: number) => {
//         //     let message = 'Your requested item, ' + item + ' has been purchased.'
//         //     let text = {
//         //         to: phone,
//         //         body: message
//         //     }
//         //     try {
//         //         let result = await json('/twilio', 'POST', text)
//         //         if (result) {
//         //             console.log(message)
//         //             let done = json(`/api/items/${itemid}`, 'DELETE')
//         //             if (done) {
//         //                 console.log('item deleted')
//         //                 location.reload();
//         //             }
//         //         }
//         //     } catch (e) {
//         //         console.log(e)
//         //     }
//         // }
    
//         useEffect(() => { getList() }, []);
    
//         return (
//             <div className="row">
//                 <div className="storeCard col-6 p-0 card ml-3 mr-0">
//                     <div className="card-header bg-light text-center text-black w-100">
//                     <select className="form-control col mr-2" value={values.storeid}
//                         onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handlers.setStoreid(Number(e.target.value))}>
//                         <option>Select a Store</option>
//                         {storeList.map(store => {
//                             return (
//                                 <option key={store.id} value={store.id}>{store.store}</option>
//                             )
//                         })}
//                     </select>
    
//                     </div>
//                     <div className="card-header bg-light text-center text-black w-100">
//                         <h4>{store}</h4>
//                         <button className="mx-3"
//                         onClick={() => history.push('/')}>home</button>
//                     </div>
    
//                     <ul className="list-group list-group-flush p-3">
//                         {items.map(item => {
//                             return (
//                                 <li className="list-group-item " key={item.id}>{item.item}
//                                     <span className="float-right">
//                                         <button className=""
//                                             onClick={(e) => handleMessage(item.item, item.phone, item.id)}>Purchased</button>
//                                     </span></li>
//                             )
//                         })}
//                     </ul>
//                 </div>
//             </div>
//         );
//     }
    
  

// export default OneList;