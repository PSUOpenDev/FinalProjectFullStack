import React, { useState, useEffect, useContext, useReducer } from 'react';
import getAutoComplete from '../../../lib_client/getAutoComplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import GlobalContext from '../../../lib_client/globalContext';
import InputBase from '@mui/material/InputBase';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const SearchStock = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [symbolSelected, setSymbolSelected] = useState([]);
    const global = useContext(GlobalContext);

    const handleSearch = async (query) => {
        if (query && query !== '' && query.length > 2) {
            const res = await getAutoComplete(query);
            console.log('ket qua nhan ve tu autocomple = ', res);
            console.log(
                'global watchlist truoc khi set = ',
                global.watchStockList
            );
            if (res.success && res.data) {
                console.log('===============', res.data[0].Result);
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
                    style={{ backgroundColor: 'black', zIndex: 100}}
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

        // <Autocomplete
        //   id="stock-select"
        //   sx={{ width: 300 }}
        //   options={suggestions}
        //   autoHighlight
        //   autoComplete="off"
        //   onSelect={(e)=> {console.log("event = ",e)}}
        //   getOptionLabel={(option) => option.symbol}
        //   renderOption={(props, option) => {
        //     return (
        //       <Box component="li" {...props}>
        //         {option.name} {' - Symbol:'} {option.symbol}
        //         {' - Exchange:'} {option.exchange}
        //       </Box>
        //     )
        //   }}
        //   renderInput={(params) => (
        //     <Search>
        //       <SearchIconWrapper>
        //         <SearchIcon />
        //       </SearchIconWrapper>
        //       {/* <TextField
        //       {...params}
        //       label=""
        //       inputProps={{
        //         ...params.inputProps,
        //         autoComplete: 'new-password', // disable autocomplete and autofill
        //       }}
        //     /> */}
        //       <StyledInputBase
        //         {...params}
        //         onChange={(e) => {
        //           handleInputChange(e.target.value)
        //         }}
        //         id="search-input"
        //         placeholder="Choose a stock"
        //         inputProps={{
        //           ...params.inputProps,
        //           autoComplete: 'off', // disable autocomplete and autofill
        //           'aria-label': 'search',
        //         }}
        //         sx={{
        //           color: 'white',
        //           paddingLeft: 5,
        //           width: '100%',
        //         }}
        //       />
        //     </Search>
        //   )}
        // />
    );
};
// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }))

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }))

// const StyledInputBase = styled(TextField)(({ theme }) => ({
//   color: 'inherit',
//    '.MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }))
//   const handleSearch = async (query) => {
//     const res = await getAutoComplete(query)

//     if (res.success && res.data && res.data.data && res.data.data.Result) {
//       setSuggestions(res.data.data.Result)
//     }
//   }
//   const handleSelectedStock = (e) => {
//     setSelectedStock(e)
//   }

//   return (
//     <div>
//       <AsyncTypeahead
//         id="stock-search"
//         onSearch={handleSearch}
//         options={suggestions}
//         onChange={handleSelectedStock}
//         selected={selectedStock}
//         labelKey="symbol"
//         placeholder="Choose a stock..."
//         renderMenuItemChildren={renderMenuItemChildren}
//       />
//     </div>
//   )
// }
export default SearchStock;
