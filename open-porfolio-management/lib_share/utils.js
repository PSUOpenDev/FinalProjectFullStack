// Function to get URL
export function getURL() {
    return process.env.NODE_ENV !== "production"
        ? process.env.NEXT_PUBLIC_DEV_URL
        : process.env.NEXT_PUBLIC_PROD_URL;
}


// Function to return from server
export function returnFromServer(data) {
    return {
        props: {
            data,
        },
    };
}


// Function to check if expired or not
export const isExpired = (lastTime, currentTime, duration) => {
    return currentTime - lastTime > duration;
};


// Function to get the date from timestamp
export const timestampToDate = (timestamp) => {
    return new Date(timestamp * 1000);
};


// Function to convert from date to timestamp
export const dateToTimestamp = (date) => {
    return Math.floor(date.getTime() / 1000);
};


// Function to convert to milisecond from date, hours, minutes and seconds
export const durationInMilliseconds = (day, hours, minutes, seconds) => {
    return (
        day * 24 * 3600 * 100 +
        hours * 3600 * 100 +
        minutes * 60 * 100 +
        seconds * 100
    );
};


// Function to get the duration from current time to a specific time
export const getStringOfDurationFromCurrentTo = (comparedDate) => {
    const allKinds = ["1d", "5d", "1mo", "3mo", "6mo", "1y", "5y"];

    // Initialize the choose period
    let choosePeriod = "";

    for (const period of allKinds) {
        const date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        switch (period) {
            case "1d":
                date.setDate(date.getDate() - 1);
                break;
            case "2d":
                date.setDate(date.getDate() - 2);
                break;
            case "3d":
                date.setDate(date.getDate() - 3);
                break;
            case "5d":
                date.setDate(date.getDate() - 5);
                break;
            case "1mo":
                date.setMonth(date.getMonth() - 1);
                break;
            case "3mo":
                date.setMonth(date.getMonth() - 3);
                break;
            case "6mo":
                date.setMonth(date.getMonth() - 6);
                break;
            case "1y":
                date.setYear(date.getYear() - 1);
                break;
            case "5y":
                date.setYear(date.getYear() - 5);
                break;
            default:
                break;
        }

        if (date < comparedDate) {
            choosePeriod = period;
            break;
        }
    }
    return choosePeriod;
};


// Function to return the date based on the specific duration
export const getDateOfDurationString = (durationString) => {
    const date = new Date();

    switch (durationString) {
        case "1d":
            date.setDate(date.getDate() - 1);
            break;
        case "2d":
            date.setDate(date.getDate() - 2);
            break;
        case "3d":
            date.setDate(date.getDate() - 3);
            break;
        case "5d":
            date.setDate(date.getDate() - 5);
            break;
        case "1mo":
            date.setMonth(date.getMonth() - 1);
            break;
        case "3mo":
            date.setMonth(date.getMonth() - 3);
            break;
        case "6mo":
            date.setMonth(date.getMonth() - 6);
            break;
        case "1y":
            date.setYear(date.getFullYear() - 1);
            break;
        case "5y":
            date.setYear(date.getFullYear() - 5);
            break;
        default:
            return null;
    }
    return date;
};


// Function to convert the object type
export function convertObjType(obj) {
    const res = {};

    for (const key in obj) {
        if (
            typeof obj[key] === "string" &&
            ((obj[key].startsWith("{") && obj[key].endsWith("}")) ||
                (obj[key].startsWith("[") && obj[key].endsWith("]")))
        ) {
            res[key] = JSON.parse(obj[key]);
        } else if (obj[key] === "true") res[key] = true;
        else if (obj[key] === "false") res[key] = false;
        else {
            const regExp = /[a-zA-Z]/g;

            if (regExp.test(obj[key])) {
                res[key] = obj[key];
            } else {
                const parsedInt = parseInt(obj[key]);

                if (isNaN(parsedInt)) {
                    const parsedFloat = parseFloat(obj[key]);

                    if (isNaN(parsedFloat)) {
                        res[key] = obj[key];
                    } else {
                        res[key] = parsedFloat;
                    }
                } else {
                    res[key] = parsedInt;
                }
            }
        }
    }
    return res;
}
