import React from 'react';
export const initialGlobalState = {
    selectedStock: null,
    watchStockList: {},
    update: () => {},
};
const GlobalContext = React.createContext(initialGlobalState);

export default GlobalContext;
