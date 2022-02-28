import { GET_WATCH_STOCK } from "../lib_share/apiNames";
import axios from "axios";
import { getURL } from "../lib_share/utils";

export default async function getWatchStock(email) {
    const params = {
        command: GET_WATCH_STOCK,
        email,
    };

    const res = await axios.get(`${getURL()}/api/getWatchStock?`, { params });
    return res.data;
}
