export function getURL() {
    let dev = process.env.NODE_ENV !== "production";
    let { DEV_URL, PROD_URL } = process.env;

    return dev ? DEV_URL : PROD_URL;
}

export function returnFromServer(data) {
    return {
        props: {
            data,
        },
    };
}

