import { useEffect, useState, useContext } from 'react';
import ChartBoard from '../components/Common/ChartBoard';
import News from '../components/Common/News';
import { returnFromServer } from '../lib_share/utils';
import SearchStock from './../components/Common/SearchStock/index';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import WatchStockList from '../components/Common/WatchStockList';
import { GoogleCheck } from '../components/Common/Firebase';
import getWatchStock from '../lib_client/getWatchStock';
import { getGoogleUserEmail } from './../components/Common/Firebase/index';
import GlobalContext from '../lib_client/globalContext';

export default function Home({ dataInput }) {
    return (
        <Grid container spacing={2}>
            <Grid item xm={12}>
                <WatchStockList />
            </Grid>
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
    );
}

export async function getServerSideProps(context) {
    let response = [];
    let res = response;
    return returnFromServer(res);
}
