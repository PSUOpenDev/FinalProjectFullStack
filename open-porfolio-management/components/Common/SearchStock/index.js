import { useState, useContext } from 'react';
import getAutoComplete from '../../../lib_client/getAutoComplete';
import GlobalContext from '../../../lib_client/globalContext';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const SearchStock = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [symbolSelected, setSymbolSelected] = useState([]);
    const global = useContext(GlobalContext);

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
        global.selectedStock = e[0];
        global.update({ ...global });
    };

    const renderMenuItemChildren = (option, index) => {
        return (
            <div>
                <div
                    key={index}
                    style={{
                        backgroundColor: 'black',
                        zIndex: 100,
                    }}
                >
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
        <div>
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
        </div>
    );
};

export default SearchStock;
