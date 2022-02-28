// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as api from '../../lib_server/apiUtils';

import { deleteDoc } from '../../lib_share/dbUtils';

import { DELETE_STOCK_PRICE } from '../../lib_share/apiNames';

const url = require('url');

export default async function handler(req, res) {
    console.log('method = ', req.method);
    try {
        switch (req.method) {
            case 'DELETE':
                {
                    const queryObject = req.body;

                    console.log('delete queryObject =', queryObject);

                    switch (queryObject.command) {
                        case DELETE_STOCK_PRICE:
                            {
                                delete queryObject.command;
                                const res = await deleteDoc('watch_stock', {
                                    email: queryObject.email,
                                    symbol: queryObject.symbol,
                                });
                            }
                            break;
                    }

                    res.json({
                        data: JSON.parse(JSON.stringify(res.data)),
                        success: res.success,
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
