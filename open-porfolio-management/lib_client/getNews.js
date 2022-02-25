import { GET_NEWS } from "../lib_share/apiNames";
import axios from "axios";
import { getURL } from "../lib_share/utils";

export default async function getNews(stockCode) {
    const params = {
        command: GET_NEWS,
        symbol: stockCode,
    };

    const res = await axios.get(`${getURL()}/api/news?`, { params });
    return res.data;
}
