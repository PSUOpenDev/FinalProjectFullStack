// Global context
import React from 'react';


// Initialize the global state
// For the selected stock
// For the watchlist stock
// For getting the stock notifications
export const initialGlobalState = {
    selectedStock: { 
        symbol: 'GOOG', 
        name: 'Alphabet Inc.' 
    },
    watchStockList: {},
    notification:[],
    update: () => {},
};


// Create the global context for the initial global context
const GlobalContext = React.createContext(initialGlobalState);

export default GlobalContext;
