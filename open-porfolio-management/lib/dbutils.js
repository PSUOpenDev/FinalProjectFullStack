import { getURL } from "./utils";

export function addDoc(collection, object) {
    return fetch("/api/db", {
        method: "POST",
        body: JSON.stringify({
            collection,
            object,
        }),
    });
}

export function updateDoc(collection, object, condition) {
    return fetch("/api/db", {
        method: "PUT",
        body: JSON.stringify({
            collection,
            object,
            condition,
        }),
    });
}

export function setDoc(collection, object) {
    return fetch("/api/db", {
        method: "PUT",
        body: JSON.stringify({
            collection,
            object,
        }),
    });
}

export function deleteDoc(collection, condition) {
    return fetch("/api/db", {
        method: "DELETE",
        body: JSON.stringify({
            collection,
            condition,
        }),
    });
}

export function getDoc($collection, condition) {
    const newCondition = {
        ...condition,
        $collection,
    };
    let urlString = new URLSearchParams(newCondition).toString();

    if (typeof window === "undefined")
        return fetch(`${getURL()}/api/db?` + urlString);
    else return fetch(`/api/db?` + urlString);
}
