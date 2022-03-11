// File contains function to get the stock price
import { GET_STOCK_PRICE } from "../lib_share/apiNames";
import axios from "axios";
import { getURL } from "../lib_share/utils";


// Function to get the stock price
export default async function getStockPrice(symbol) {
    const params = {
        command: GET_STOCK_PRICE,
        symbols:symbol,
        region:'US',
        lang:'en'
    };

    const res = await axios.get(`${getURL()}/api/getStockPrice?`, { params });
    return res.data;
}
