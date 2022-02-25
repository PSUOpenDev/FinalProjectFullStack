import { useEffect, useState } from "react";

import ChartBoard from "../components/Common/ChartBoard";
import News from "../components/Common/News";
import { returnFromServer } from "../lib_share/utils";
import SearchStock from "./../components/Common/SearchStock/index";

export default function Home({ dataInput }) {
    return (
        <div>
            {/* <SearchStock></SearchStock>
            <ChartBoard
                selectedStock={{ stockName: "TESLA", symbol: "TSLA" }}
                chartType={"HeikinAshi"}
                showStockName={true}
            ></ChartBoard> */}
            <News></News>
        </div>
    );
}

export async function getServerSideProps(context) {
    let response = [];
    let res = response;
    return returnFromServer(res);
}
