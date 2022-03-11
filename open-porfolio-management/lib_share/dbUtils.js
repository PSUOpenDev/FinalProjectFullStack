// Import package
import axios from 'axios';
import { getURL } from './utils';


// Function to add into db
export async function addDoc(collection, object) {
    const res = await axios.post(`${getURL()}/api/db`, {
        collection,
        object,
    });
    return res.data;
}


// Function to update into db
export async function updateDoc(collection, object, condition) {
    const res = await axios.put(`${getURL()}/api/db`, {
        collection,
        object,
        condition,
    });
    return res.data;
}


// Function to set db
export async function setDoc(collection, object) {
    const res = await axios.put(`${getURL()}/api/db`, {
        collection,
        object,
    });
    return res.data;
}


// Function to delete db
export async function deleteDoc(collection, condition) {
    console.log('condition = ', condition);
    console.log(`URL = ${getURL()}/api/db`)
    const res = await axios.delete(`${getURL()}/api/db`, {
      data:{
        collection,
        condition,
      }
    });
    return res.data;
}


// Function to get data from db
export async function getDoc($collection, condition, $projection) {
    const newCondition = $projection
        ? {
              ...condition,
              $collection,
              $projection,
          }
        : {
              ...condition,
              $collection,
          };
    const resGet = await axios.get(`${getURL()}/api/db`, {
        params: newCondition,
    });

    return resGet.data;
}
