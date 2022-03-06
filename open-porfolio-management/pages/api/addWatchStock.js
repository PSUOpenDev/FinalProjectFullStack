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

import { ADD_WATCH_STOCK } from '../../lib_share/apiNames';

const url = require('url');

export default async function handler(req, res) {
    try {
        switch (req.method) {
            case 'POST':
                {
                    const queryObject = req.body;

                    let response = true;

                    switch (queryObject.command) {
                        case ADD_WATCH_STOCK:
                            {
                                delete queryObject.command;
                                const res = await getDoc('watch_stock', {
                                    email: queryObject.email,
                                    symbol: queryObject.symbol,
                                });

                                console.log('queryObject =', queryObject);
                                const newObject = {
                                    ...queryObject,
                                    updateDate: new Date(),
                                    upperThreshold: parseFloat(
                                        queryObject.upperThreshold
                                    ),
                                    lowerThreshold: parseFloat(
                                        queryObject.lowerThreshold
                                    ),
                                };

                                if (res.data.length == 0) {
                                    delete queryObject.command;
                                    await addDoc('watch_stock', newObject);
                                } else {
                                    const res1 = await updateDoc(
                                        'watch_stock',
                                        newObject,
                                        {
                                            email: queryObject.email,
                                            symbol: queryObject.symbol,
                                        }
                                    );
                                }
                            }
                            break;
                    }

                    res.json({
                        data: JSON.parse(JSON.stringify(response)),
                        success: true,
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
