// File contains function to add the watchlist stock
import { ADD_WATCH_STOCK } from '../lib_share/apiNames';
import axios from 'axios';
import { getURL } from '../lib_share/utils';


// Function to add into the watchlist stock
export default async function addWatchStock(
    email, 
    symbol,upperThreshold = -1,
    lowerThreshold = -1
) {
    const params = {
        command: ADD_WATCH_STOCK,
        email,
        symbol,
        upperThreshold,
        lowerThreshold
    };

    console.log('param = ', params);

    const res = await axios.post(`${getURL()}/api/addWatchStock`, params);
    return res.data;
}
