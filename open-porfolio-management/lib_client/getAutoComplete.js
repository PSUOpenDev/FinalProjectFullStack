import { getURL } from "../lib_share/utils";
import axios from "axios";
import { GET_AUTO_COMPLETE } from "../lib_share/apiNames";

export default async function getAutoComplete(query) {
    console.log("benh here")
    const params = {
        command: GET_AUTO_COMPLETE,
        lang: "en",
        query,
        region: "US",
    };
    console.log(`${getURL()}/api/autoComplete`, { params });
    const res = await axios.get(`${getURL()}/api/autoComplete`, { params });
    return res.data;
}
