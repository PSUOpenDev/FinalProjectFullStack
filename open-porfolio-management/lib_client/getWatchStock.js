// File contains the function to get data fromthe watchlist stock
import { GET_WATCH_STOCK } from "../lib_share/apiNames";
import axios from "axios";
import { getURL } from "../lib_share/utils";


// Function to get data from the watchlist stock
export default async function getWatchStock(email) {
    const params = {
        command: GET_WATCH_STOCK,
        email,
    };

    const res = await axios.get(`${getURL()}/api/getWatchStock?`, { params });
    return res.data;
}
