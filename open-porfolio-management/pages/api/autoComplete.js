// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as api from "../../lib_server/apiUtils";

import {
    addDoc,
    getDoc,
    putDoc,
    setDoc,
    updateDoc,
} from "../../lib_share/dbUtils";
import {
    convertObjType,
    dateToTimestamp,
    durationInMilliseconds,
    getDateOfDurationString,
    isExpired,
    timestampToDate,
} from "../../lib_share/utils";

import { GET_AUTO_COMPLETE } from "../../lib_share/apiNames";

const url = require("url");
export default async function handler(req, res) {
    try {
        const queryObject = convertObjType(url.parse(req.url, true).query);
        let response = null;

        switch (queryObject.command) {
            case GET_AUTO_COMPLETE:
                {
                    let params = { ...queryObject };
                    delete params.command;
                    response = await api.callAPI({
                       
                        name: api.API_URL_AUTO_COMPLETE,
                        url: api.API_URL_AUTO_COMPLETE,
                        params,
                       
                        onParsingAnFiltering: handleParsingAndFiltering,
                        onSaving: handleSaving,

                        onSelecting: handleSelecting,
                        onError: handleError,
                    });
                   
                }
                break;
        }
        res.json({
            data: JSON.parse(
                JSON.stringify({ data: response })
            ),
            success: true,
        });
    } catch (error) {
        // return the error
        res.json({
            data: new Error(error).message,
            success: false,
        });
    }
}

async function handleParsingAndFiltering({ rawData, params }) {
    if (rawData) {
        return rawData.ResultSet;
    }
    return null;
}

async function handleSaving({ data, params }) {
    const newData = { ...data, updatedDate: new Date() };
    const res = await updateDoc("stock_autocomplete", newData, {
        Query: params.query,
    });
  
    if (res.success === false) {
        await addDoc("stock_autocomplete", newData);
    }
    return null;
}

async function handleSelecting({ params }) {
    const res = await getDoc("stock_autocomplete", { Query: params.query });

    if (res.success && res.data.length>0) {
        return res.data;
    }

    return null;
}

function handleError({ params, error }) {
    console.log("error = ", error);

    return error;
}
