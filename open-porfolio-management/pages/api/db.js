const { connectToDatabase } = require("../../middleware/connectMongoDB");
const ObjectId = require("mongodb").ObjectId;
const http = require("http");
const url = require("url");

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case "GET": {
            return getData(req, res);
        }

        case "POST": {
            console.log("POST");
            return addData(req, res);
        }

        case "PUT": {
            console.log("PUT");
            return updateData(req, res);
        }

        case "DELETE": {
            console.log("DELETE");
            return deleteData(req, res);
        }
    }
}

async function getData(req, res) {
    try {
        const queryObject = url.parse(req.url, true).query;
        const { $collection } = queryObject;
        delete queryObject.$collection;

        // connect to the database
        let { db } = await connectToDatabase();

        // fetch the rows
        let user = await db
            .collection($collection)
            .find(queryObject ? queryObject : {})
            //.sort({})
            .toArray();

        return res.json({
            data: JSON.parse(JSON.stringify(user)),
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

async function addData(req, res) {
    try {
        const obj = JSON.parse(req.body);

        // connect to the database
        let { db } = await connectToDatabase();
        // add the row
        await db.collection(obj.collection).insertOne(obj.object);
        // return a message
        return res.json({
            data: "added successfully",
            success: true,
        });
    } catch (error) {
        // return an error
        return res.json({
            data: new Error(error).message,
            success: false,
        });
    }
}

async function updateData(req, res) {
    try {
        const obj = JSON.parse(req.body);

        // connect to the database
        let { db } = await connectToDatabase();

        if (typeof obj.condition !== "undefined") {
            if (typeof obj.condition._id === "string") {
                obj.condition._id = ObjectId(obj.condition._id);
            }
        } else {
            obj.condition = { _id: ObjectId(obj.object._id) };
        }

        if (typeof obj.object._id !== "undefined") {
            delete obj.object._id;
        }


        // update the published status of the user
        await db.collection(obj.collection).update(obj.condition, {
            $set: obj.object,
        });

        // return a message
        return res.json({
            data: "updated successfully",
            success: true,
        });
    } catch (error) {
        // return an error
        console.log("Error", new Error(error).message);
        return res.json({
            data: new Error(error).message,
            success: false,
        });
    }
}

async function deleteData(req, res) {
    try {
        const obj = JSON.parse(req.body);

        // Connecting to the database
        let { db } = await connectToDatabase();

        // Deleting the user
        await db.collection(obj.collection).deleteOne(obj.condition);

        // returning a message
        return res.json({
            data: "deleted successfully",
            success: true,
        });
    } catch (error) {
        // returning an error
        return res.json({
            data: new Error(error).message,
            success: false,
        });
    }
}
