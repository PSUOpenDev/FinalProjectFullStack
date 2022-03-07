import React from 'react';
import GlobalContext from '../../../lib_client/globalContext';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import WatchStockPanel from '../../WatchStockPanel';

export default function WatchStockList() {
    const [state, setState] = React.useState(false);
    const global = React.useContext(GlobalContext);

    React.useEffect(() => {
        setState(!state);
    }, [global.watchStockList]);

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {Object.values(global.watchStockList).map((symbol, index) => {
                return <WatchStockPanel stock={symbol} key={index} />;
            })}
        </Grid>
    );
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
