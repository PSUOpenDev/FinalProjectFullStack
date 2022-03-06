import ChartBoard from '../components/Common/ChartBoard';
import News from '../components/Common/News';
import { returnFromServer } from '../lib_share/utils';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import WatchStockList from '../components/Common/WatchStockList';


export default function Home({ dataInput }) {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xm={12}>
                    <WatchStockList />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xm={8}>
                    <ChartBoard
                        selectedStock={{ stockName: 'AAPL', symbol: 'TSLA' }}
                        chartType={'HeikinAshi'}
                        showStockName={true}
                        width={600}
                    ></ChartBoard>
                </Grid>
                <Grid item xm={4}>
                    <News />
                </Grid>
            </Grid>
        </>
    );
}

export async function getServerSideProps(context) {
    let response = [];
    let res = response;
    return returnFromServer(res);
}
