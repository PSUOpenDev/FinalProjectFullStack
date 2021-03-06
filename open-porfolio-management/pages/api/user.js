// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
    addDoc,
    getDoc
} from '../../lib_share/dbUtils';

import { SET_USER } from '../../lib_share/apiNames';

const url = require('url');

export default async function handler(req, res) {
    try {
        switch (req.method) {
            case 'POST':
                {
                    const queryObject = req.body;

                    let response = true;

                    switch (queryObject.command) {
                        case SET_USER:
                            {
                                const res = await getDoc('users', {
                                    email: queryObject.email,
                                });
                                if (res.data.length == 0) {
                                    delete queryObject.command;
                                    await addDoc('users', {
                                        ...queryObject,
                                        updateDate: new Date(),
                                    });
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
