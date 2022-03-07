import React from 'react';
export const initialGlobalState = {
    selectedStock: null,
    watchStockList: {},
    notification:[],
    update: () => {},
};
const GlobalContext = React.createContext(initialGlobalState);

export default GlobalContext;
