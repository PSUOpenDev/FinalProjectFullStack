import React, { useState, useEffect } from "react";
import getAutoComplete from "../../../lib_client/getAutoComplete";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

const SearchStock = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [selectedStock, setSelectedStock] = useState([]);

    const renderMenuItemChildren = (option, index) => {
        return (
            <div>
                <div key={index}>
                    <strong>{option.stockName}</strong>
                    <div>
                        <small>Symbol: {option.symbol}</small>
                    </div>
                    <div>
                        <small>Exchange: {option.exchange}</small>
                    </div>
                </div>
            </div>
        );
    };

    const handleSearch = async (query) => {
        const res = await getAutoComplete(query);

        if (res.success && res.data && res.data.data && res.data.data.Result) {
            setSuggestions(res.data.data.Result);
        }
    };
    const handleSelectedStock = (e) => {
        setSelectedStock(e);
    };

    return (
        <div>
            <AsyncTypeahead
                id="stock-search"
                onSearch={handleSearch}
                options={suggestions}
                onChange={handleSelectedStock}
                selected={selectedStock}
                labelKey="symbol"
                placeholder="Choose a stock..."
                renderMenuItemChildren={renderMenuItemChildren}
            />
        </div>
    );
};
export default SearchStock;
