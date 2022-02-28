// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as api from '../../lib_server/apiUtils';

import {
    addDoc,
    getDoc,
    putDoc,
    setDoc,
    updateDoc,
} from '../../lib_share/dbUtils';
import {
    convertObjType,
    dateToTimestamp,
    durationInMilliseconds,
    getDateOfDurationString,
    isExpired,
    timestampToDate,
} from '../../lib_share/utils';

import { GET_STOCK_PRICE } from '../../lib_share/apiNames';

const url = require('url');

export default async function handler(req, res) {
    try {
        const queryObject = convertObjType(url.parse(req.url, true).query);

        let response = null;

        switch (queryObject.command) {
            case GET_STOCK_PRICE:
                {
                    let params = { ...queryObject };
                    delete params.command;

                    response = await api.callAPI({
                        name: api.API_URI_STOCK_QUOTE,
                        url: api.API_URI_STOCK_QUOTE,
                        params,
                        onSaving: handleSaving,
                        onSelecting: handleSelecting,
                        onError: handleError,
                        onParsingAnFiltering: handleParsingAndFiltering,
                    });
                }
                break;
        }

        res.json({
            data: JSON.parse(JSON.stringify(response)),
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

async function handleSaving({ data, params }) {
    const newData = { ...data, symbol: params.symbols, updatedDate: new Date() };
    console.log('newData Price = ', newData)
    const res = await updateDoc('stock_price', newData, {
        symbol: params.symbols,
    });

    if (res.success === false) {
        await addDoc('stock_price', newData);
    }
}

async function handleSelecting({ params }) {
    const res = await getDoc('stock_price', { symbol: params.symbols });

    if (res.success && res.data.length > 0) {
        return res.data;
    }

    return null;
}

function handleError({ params, error }) {
    console.log('error = ', error);

    return error;
}

async function handleParsingAndFiltering({ rawData, params }) {
    if (rawData !== null) {
        return rawData.quoteResponse.result[0];
    }
    return null;
}
