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

import { GET_WATCH_STOCK } from '../../lib_share/apiNames';

const url = require('url');

export default async function handler(req, res) {
    try {
        switch (req.method) {
            case 'GET':
                {
                    const queryObject = convertObjType(
                        url.parse(req.url, true).query
                    );
                    console.log("queryObject =" , queryObject);
                    let response = true;

                    switch (queryObject.command) {
                        case GET_WATCH_STOCK:
                            {
                                response = await getDoc('watch_stock', {
                                    email: queryObject.email,
                                });
                            }
                            break;
                    }

                    res.json({
                        data: JSON.parse(JSON.stringify(response.data)),
                        success: response.success,
                    });
                }
                break;
        }
    } catch (error) {
        // return the error
        res.json({
            data: new Error(error).message,
            success: false,
        });
    }
}
