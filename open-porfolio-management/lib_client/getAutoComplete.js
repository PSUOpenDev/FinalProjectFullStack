// File contains function to get data for the auto complete search
import { getURL } from '../lib_share/utils';
import axios from 'axios';
import { GET_AUTO_COMPLETE } from '../lib_share/apiNames';


// Function to get data for the auto complete search
export default async function getAutoComplete(query) {
    console.log('ddddd = ', query);
    
    const params = {
        command: GET_AUTO_COMPLETE,
        lang: 'en',
        query,
        region: 'US',
    };

    const res = await axios.get(`${getURL()}/api/autoComplete`, { params });
    return res.data;
}
