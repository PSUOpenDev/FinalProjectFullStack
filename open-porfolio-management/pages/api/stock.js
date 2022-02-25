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

import { GET_STOCK_CHART } from "../../lib_share/apiNames";

const url = require("url");
export default async function handler(req, res) {
    try {
        const queryObject = convertObjType(url.parse(req.url, true).query);
        let data = null;

        switch (queryObject.command) {
            case GET_STOCK_CHART:
                {
                    let params = { ...queryObject };
                    delete params.command;

                    let queryString = queryObject.ticker;
                    delete queryObject.ticker;

                    let urlString = new URLSearchParams(queryObject).toString();

                    data = await api.callAPI({
                        name: api.API_URL_STOCK_CHART,
                        url: api.API_URL_STOCK_CHART + queryString,

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
            data: JSON.parse(JSON.stringify({ data })),
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
    if (rawData !== null && rawData.chart !== undefined) {
        const symbol = rawData.chart.result[0].meta.symbol;
        const timeStamp = rawData.chart.result[0].timestamp;
        const theQuote = rawData.chart.result[0].indicators.quote[0];
        const high = theQuote.high;
        const low = theQuote.low;
        const open = theQuote.open;
        const volume = theQuote.volume;
        const close = theQuote.close;
        const length = timeStamp.length;
        const firstDate = timeStamp[0];
        const result = [];

        for (let i = 0; i < length; i++) {
            result.push({
                symbol,
                date: timeStamp[i],
                open: open[i],
                close: close[i],
                volume: volume[i],
                high: high[i],
                low: low[i],
                objDate: timestampToDate(timeStamp[i]),
            });
        }

        const objLastDate = new Date();
        const lastDate = dateToTimestamp(objLastDate);
        const returnResult = {
            symbol,
            history: result,
            lastDate,
            objFirstDate: timestampToDate(firstDate),
            objLastDate,
            range: params.range,
        };

        return returnResult;
    }
    return null;
}

async function handleSaving({ data, params }) {
  
    if (data != null) {
        const result = await updateDoc("stock_chart", data, {
            symbol: params.ticker,
            range: params.range,
        });

        if (result.success === false) {
            await addDoc("stock_chart", data);
        }
    }

    return data;
}

async function handleSelecting({ params }) {
    const d2 = getDateOfDurationString("1d");
    const t2 = dateToTimestamp(d2);

    const result = await getDoc("stock_chart", {
        symbol: params.ticker,
        range: params.range,
        lastDate: { $gt: t2 },
    });

    if (result.data.length > 0) {
        return result.data;
    }

    return null;
}

function handleError({ params, error }) {
    console.log("error = ", error);
    return error;
}
