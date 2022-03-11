const { connectToDatabase } = require('../../lib_server/connectMongoDB');
const { convertObjType } = require('../../lib_share/utils');

const ObjectId = require('mongodb').ObjectId;
const url = require('url');

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getData(req, res);
        }

        case 'POST': {
            return addData(req, res);
        }

        case 'PUT': {
            return updateData(req, res);
        }

        case 'DELETE': {
            return deleteData(req, res);
        }
    }
}

async function getData(req, res) {
    try {
        const queryObject = convertObjType(url.parse(req.url, true).query);
        const { $collection, $projection } = queryObject;

        if ($collection) delete queryObject.$collection;
        if ($projection) delete queryObject.$projection;

        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the rows
        let rows = $projection
            ? await db
                  .collection($collection)
                  .find(queryObject ? queryObject : {}, $projection)
                  .toArray()
            : await db
                  .collection($collection)
                  .find(queryObject ? queryObject : {})
                  .toArray();

        return res.json({
            data: JSON.parse(JSON.stringify(rows)),
            success: true,
        });
    } catch (error) {
        // return the error
        return res.json({
            data: new Error(error).message,
            success: false,
        });
    }
}

function addData(req, res) {
    return new Promise((resolve) => {
        const obj = req.body;

        // connect to the database
        connectToDatabase()
            .then(({ db }) => {
                db.collection(obj.collection).insertOne(obj.object, (e, r) => {
                    if (e) {
                        res.json({
                            data: new Error(error).message,
                            success: false,
                        });
                    } else {
                        res.json({
                            data: r,
                            success: r.insertedId !== null,
                        });
                    }
                    resolve();
                });
            })
            .catch((e) => {
                res.json({
                    data: new Error(e).message,
                    success: false,
                });

                resolve();
            });
    });
}

function updateData(req, res) {
    return new Promise((resolve) => {
        const obj = req.body;
        connectToDatabase()
            .then(({ db }) => {
                if (typeof obj.condition !== 'undefined') {
                    if (typeof obj.condition._id === 'string') {
                        obj.condition._id = ObjectId(obj.condition._id);
                    }
                } else {
                    obj.condition = { _id: ObjectId(obj.object._id) };
                }

                if (typeof obj.object._id !== 'undefined') {
                    delete obj.object._id;
                }

                // update the published status of the user
                db.collection(obj.collection).updateOne(
                    obj.condition,
                    {
                        $set: obj.object,
                    },
                    (e, r) => {
                        if (e) {
                            res.json({
                                data: new Error(e).message,
                                success: false,
                            });
                        } else {
                            res.json({
                                data: r,
                                success: r.matchedCount === 1,
                            });
                        }
                        resolve();
                    }
                );
            })
            .catch((e) => {
                res.json({
                    data: new Error(e).message,
                    success: false,
                });
                resolve();
            });
    });
}

async function deleteData(req, res) {
    try {
        const obj = req.body;
        console.log('delete obj = ',obj)
        // Connecting to the database
        let { db } = await connectToDatabase();

        // Deleting the user
        await db.collection(obj.collection).deleteOne(obj.condition, (e, r) => {
            if (e) {
                res.json({
                    data: new Error(e).message,
                    success: false,
                });
            } else {
                res.json({
                    data: r,
                    success: r.matchedCount === 1,
                });
            }
        });
    } catch (error) {
        // returning an error
        return res.json({
            data: new Error(error).message,
            success: false,
        });
    }
}
