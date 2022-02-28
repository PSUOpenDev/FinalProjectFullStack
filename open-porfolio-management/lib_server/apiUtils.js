import axios from 'axios';
import { dateToTimestamp } from '../lib_share/utils';

export const API_URL_AUTO_COMPLETE =
    'https://yfapi.net/v6/finance/autocomplete';

export const API_URL_STOCK_CHART = 'https://yfapi.net/v8/finance/chart/';

export const API_URL_MARKET_SUMMARY =
    'https://yfapi.net/v6/finance/quote/marketSummary';

export const API_URL_STOCK_SUMMARY =
    'https://yfapi.net/v11/finance/quoteSummary/';

export const API_URI_STOCK_QUOTE = 'https://yfapi.net/v6/finance/quote';

export const API_URI_STOCK_NEWS =
    'https://yfapi.net/ws/insights/v1/finance/insights';

const arrayYahoo = JSON.parse(process.env.NEXT_PUBLIC_YAHOO_API_KEY_ARRAY);
const arrayNews = JSON.parse(process.env.NEXT_PUBLIC_NEWS_API_KEY_ARRAY);

const getHeader = (API_URI) => {
    switch (API_URI) {
        case API_URI_STOCK_NEWS:
        // return {
        //     "x-rapidapi-host": "google-search1.p.rapidapi.com",
        //     "x-rapidapi-key": apiKeyProvider("NewsAPI"),
        // };
        case API_URL_AUTO_COMPLETE:
        case API_URL_STOCK_SUMMARY:
        case API_URI_STOCK_QUOTE:
        case API_URL_MARKET_SUMMARY:
        case API_URL_STOCK_CHART:
            return {
                accept: 'application/json',
                'X-API-KEY': apiKeyProvider('YahooAPI'),
            };
    }
};

const initialState = {
    name: '',
    url: '',
    params: {},
    currentTime: dateToTimestamp(new Date()),
    onParsingAnFiltering: undefined,
    onSaving: undefined,
    onSelecting: undefined,
    onError: undefined,
};

export async function callAPI(parameter = initialState) {
    try {
        let tempData = null;

        if (parameter.onSelecting !== undefined) {
            tempData = await parameter.onSelecting({
                params: parameter.params,
                data: tempData,
            });

            if (tempData) {
                return tempData;
            }
        }

        let response = await axios
            .get(parameter.url, {
                headers: getHeader(parameter.name),
                params: parameter.params,
            })
            .catch((e) => {
                console.log('Error', e);
            });

        tempData = response.data;

        if (parameter.onParsingAnFiltering !== undefined) {
            //Parsing data
            tempData = await parameter.onParsingAnFiltering({
                rawData: tempData,
                params: parameter.params,
            });
        }

        if (parameter.onSaving !== undefined) {
            //Saving to cache
            await parameter.onSaving({
                data: tempData,
                params: parameter.params,
            });
        }

        return [tempData];
    } catch (error) {
        if (parameter.onError !== undefined) {
            await parameter.onError({
                params: parameter.params,
                error,
                setData,
            });
        }
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

let currentYahooIndex = randomNumber(0, arrayYahoo.length - 1);
let currentNewsIndex = randomNumber(0, arrayNews.length - 1);

export function apiKeyProvider(name) {
    switch (name) {
        case 'YahooAPI': {
            currentYahooIndex = currentYahooIndex + 1;
            currentYahooIndex = currentYahooIndex % arrayYahoo.length;
            return arrayYahoo[currentYahooIndex];
        }
        case 'NewsAPI': {
            currentNewsIndex = currentNewsIndex + 1;
            currentNewsIndex = currentNewsIndex % arrayNews.length;
            return arrayNews[currentNewsIndex];
        }

        default:
            break;
    }
    return '';
}
