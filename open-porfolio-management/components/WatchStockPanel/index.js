import { Card, CardContent } from '@mui/material';
import React from 'react';
import getStockChart from '../../lib_client/getStockChart';
import getStockPrice from '../../lib_client/getStockPrice';
import AreaChart from '../Common/Charts/AreaChart';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import IconButton from '@mui/material/IconButton';
import GlobalContext from '../../lib_client/globalContext';
import deleteWatchStock from '../../lib_client/deleteWatchStock';

export default function WatchStockPanel({ stock }) {
    const [data, setData] = React.useState([]);
    const [price, setPrice] = React.useState(null);
    const global = React.useContext(GlobalContext);
    React.useEffect(() => {
        (async () => {
            let res = await getStockChart(stock.symbol, '3mo');
            let resPrice = await getStockPrice(stock.symbol);
    
            if (res.success && res.data) await setData(res.data[0].history);
            if (resPrice.success && resPrice.data) {
                await setPrice({
                    regularMarketPrice: resPrice.data[0].regularMarketPrice,
                    regularMarketChange: parseFloat(
                        resPrice.data[0].regularMarketChange
                    ),
                    regularMarketChangePercent: parseFloat(
                        resPrice.data[0].regularMarketChangePercent
                    ),
                    marketState: resPrice.data[0].marketState,
                    fullExchangeName: resPrice.data[0].fullExchangeName,
                });


                let currentPrice = parseFloat(resPrice.data[0].regularMarketPrice);
               
                if (
                    global.watchStockList[stock.symbol].upperThreshold &&
                    global.watchStockList[stock.symbol].upperThreshold > 0 && 
                    global.watchStockList[stock.symbol].upperThreshold <= currentPrice) {
                        console.log('add notification Current Price =', currentPrice)
                        global.notification.push(stock.symbol +'\'s price is higher than ' +  global.watchStockList[stock.symbol].upperThreshold +'USD');
                        global.update({ ...global });
                        console.log('notification =',  global.notification)
                }

                if (
                    global.watchStockList[stock.symbol].lowerThreshold &&
                    global.watchStockList[stock.symbol].lowerThreshold > 0 && 
                    global.watchStockList[stock.symbol].lowerThreshold >= currentPrice) {
                        
                        global.notification.push(stock.symbol +'\'s price is lower than ' +  global.watchStockList[stock.symbol].lowerThreshold +'USD');
                        global.update({ ...global });
                }

            }
            
        })();
    }, []);
    const closePanel = (symbol) => {
        deleteWatchStock(global.watchStockList[symbol].email, symbol);
        delete global.watchStockList[symbol];
        global.update({ ...global });
    };

    console.log('stock = ', stock);
    return (
        <Card>
            <CardContent>
                {stock.symbol}
                {' | '}
                {price
                    ? price.regularMarketPrice +
                      ' USD | ' +
                      price.regularMarketChange +
                      ' (' +
                      price.regularMarketChangePercent.toLocaleString(
                          undefined,
                          { minimumFractionDigits: 2 }
                      ) +
                      ')'
                    : ''}
                <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                        closePanel(stock.symbol);
                    }}
                >
                    <CloseOutlinedIcon />
                </IconButton>
                <br />
                {price
                    ? price.marketState + ' - ' + price.fullExchangeName
                    : ''}
                {data.length > 0 ? <AreaChart data={data} /> : <></>}
            </CardContent>
        </Card>
    );
}
