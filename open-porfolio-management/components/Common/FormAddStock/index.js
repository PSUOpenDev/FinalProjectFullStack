import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import addWatchStock from '../../../lib_client/addWatchStock';
import GlobalContext from '../../../lib_client/globalContext';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import getAutoComplete from '../../../lib_client/getAutoComplete';



function FromAddStock({ 
    email, 
    open, 
    onCloseDialog 
}) {
    const [suggestions, setSuggestions] = React.useState([]);
    const [symbolSelected, setSymbolSelected] = React.useState([]);

    const [stockValue, setStockValue] = React.useState('');
    const global = React.useContext(GlobalContext);

    const handleAddStock = () => {
        addWatchStock(email, symbolSelected[0].symbol);

        global.watchStockList[symbolSelected[0].symbol] = {
            ...symbolSelected[0],
            email,
        };
        global.update({ ...global });
        setStockValue('');
    };
    const handleCloseForm = () => {
        if (onCloseDialog) onCloseDialog(false);
    };

    const handleSearch = async (query) => {
        if (query && query !== '' && query.length > 2) {
            const res = await getAutoComplete(query);

            if (res.success && res.data) {
                setSuggestions(res.data[0].Result);
            }
        }
    };

    const handleSelectedStock = (e) => {
        setSymbolSelected(e);
    };

    const renderMenuItemChildren = (option, index) => {
        return (
            <div>
                <div key={index} style={{ zIndex: 100 }}>
                    <strong>{option.name}</strong>
                    <div>
                        <small>Symbol: {option.symbol}</small>
                    </div>
                    <div>
                        <small>Exchange: {option.exch}</small>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Dialog open={open}>
            <DialogTitle>Add Stock</DialogTitle>
            <DialogContent style={{ height: '400px' }}>
                <DialogContentText>
                    Add more stocks to your wishlist.
                </DialogContentText>

                <AsyncTypeahead
                    id="stock-search"
                    onSearch={handleSearch}
                    options={suggestions}
                    onChange={handleSelectedStock}
                    selected={symbolSelected}
                    labelKey="symbol"
                    placeholder="Choose a stock..."
                    renderMenuItemChildren={renderMenuItemChildren}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAddStock}>Add</Button>
                <Button onClick={handleCloseForm}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default FromAddStock;
