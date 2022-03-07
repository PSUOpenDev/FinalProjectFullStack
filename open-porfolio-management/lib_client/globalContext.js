import React from 'react';
export const initialGlobalState = {
    selectedStock: { symbol: 'GOOG', name: 'Alphabet Inc.' },
    watchStockList: {},
    notification:[],
    update: () => {},
};
const GlobalContext = React.createContext(initialGlobalState);

export default GlobalContext;
