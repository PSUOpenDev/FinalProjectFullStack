// File contains the function to get the data for the stock chart
import { GET_STOCK_CHART } from "../lib_share/apiNames";
import { getURL } from "../lib_share/utils";
import axios from "axios";


// Function to get the data for the stock chart
export default async function getStockChart(
    stockCode, 
    range
) {
    const params = {
        command: GET_STOCK_CHART,
        ticker: stockCode,
        range,
        interval: range !== "1d" ? "1d" : "1m",
        lang: "en",
        event: "div,split",
        region: "US",
    };

    const res = await axios.get(`${getURL()}/api/stock?`, { params });
    return res.data;
}
