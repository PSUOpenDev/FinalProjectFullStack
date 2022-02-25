import axios from "axios";
import { getURL } from "./utils";

export async function addDoc(collection, object) {
    const res = await axios.post(`${getURL()}/api/db`, {
        collection,
        object,
    });
    return res.data;
}

export async function updateDoc(collection, object, condition) {
    const res = await axios.put(`${getURL()}/api/db`, {
        collection,
        object,
        condition,
    });
    return res.data;
}

export async function setDoc(collection, object) {
    const res = await axios.put(`${getURL()}/api/db`, {
        collection,
        object,
    });
    return res.data;
}

export async function deleteDoc(collection, condition) {
    const res = await axios.delete(`${getURL()}/api/db`, {
        collection,
        condition,
    });
    return res.data;
}

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
