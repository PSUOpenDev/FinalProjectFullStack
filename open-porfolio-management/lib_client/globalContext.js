import React from 'react';

const GlobalContext = React.createContext({
  selectedStock:null,
  update: (data) => {}
})

export default GlobalContext