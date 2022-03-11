// File contains function to delete from the watchlist stock
import { DELETE_STOCK_PRICE } from '../lib_share/apiNames';
import axios from 'axios';
import { getURL } from '../lib_share/utils';


// Function to delete from the watchlist stock
export default async function deleteWatchStock(
    email, 
    symbol
) {
    const params = {
        command: DELETE_STOCK_PRICE,
        email,
        symbol,
    };

    console.log("param = ",params);

    const res = await axios.delete(`${getURL()}/api/deleteWatchStock`, {data:params});
    return res.data;
}
