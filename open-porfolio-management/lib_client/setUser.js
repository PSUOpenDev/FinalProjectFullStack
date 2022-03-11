// File contains the function to create user
import { SET_USER } from "../lib_share/apiNames";
import axios from "axios";
import { getURL } from "../lib_share/utils";


// Function to create user
export default async function setUser(
    userName,
    email
) {
    const params = {
        command: SET_USER,
        userName,
        email
    };

    const res = await axios.post(`${getURL()}/api/user`, params);
    return res.data;
}
