import { Button, ButtonGroup, ButtonToolbar, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import AreaChart from "../Charts/AreaChart";
import HeikinAshi from "../Charts/HeikinAshi";
import PropTypes from "prop-types";

import getStockChart from "../../../lib_client/getStockChart";

ChartBoard.propTypes = {
    selectedStock: PropTypes.object.isRequired,
    chartType: PropTypes.string,
    showStockName: PropTypes.bool,
    dataRange: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    updown: PropTypes.number,
};
ChartBoard.defaultProps = {
    chartType: "AreaChart",
    showStockName: false,
    dataRange: "3mo",
    updown: 0,
};

function ChartBoard({
    selectedStock,
    showStockName,
    chartType,
    dataRange,
    width,
    height,
    updown,
}) {
    const [symbol, setSymbol] = useState(selectedStock.symbol);
    const [range, setRange] = useState(dataRange);

    const isLoading = false;
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            let res = await getStockChart(symbol, range);

            if (
                res.success &&
                res.data &&
                res.data.data &&
                res.data.data.length > 0
            )
                setData(res.data.data[0].history);
        })();
    }, [range, symbol]);

    return (
        <>
            <div
                style={width !== null ? { width, height } : null}
                className="chart border-radius-20"
            >
                {isLoading && <Spinner animation="border" />}

                {isLoading === false && data != null && data.length > 3 && (
                    <div>
                        {selectedStock && showStockName && (
                            <h6 className="m-2">
                                {" "}
                                {selectedStock.stockName +
                                    " (" +
                                    selectedStock.symbol +
                                    ")"}
                            </h6>
                        )}
                        <div>
                            {chartType === "HeikinAshi" && (
                                <div>
                                    <ButtonToolbar
                                        variant="outline-primary"
                                        size={"sm"}
                                        className="m-2"
                                    >
                                        <ButtonGroup size={"sm"}>
                                            <Button
                                                variant="outline-warning"
                                                onClick={() => {
                                                    setRange("1d");
                                                }}
                                            >
                                                1d
                                            </Button>{" "}
                                            <Button
                                                variant="outline-warning"
                                                onClick={() => {
                                                    setRange("1mo");
                                                }}
                                            >
                                                1mo
                                            </Button>{" "}
                                            <Button
                                                variant="outline-warning"
                                                onClick={() => {
                                                    setRange("3mo");
                                                }}
                                            >
                                                3mo
                                            </Button>{" "}
                                            <Button
                                                variant="outline-warning"
                                                onClick={() => {
                                                    setRange("6mo");
                                                }}
                                            >
                                                6mo
                                            </Button>{" "}
                                            <Button
                                                variant="outline-warning"
                                                onClick={() => {
                                                    setRange("1y");
                                                }}
                                            >
                                                1y
                                            </Button>{" "}
                                            <Button
                                                variant="outline-warning"
                                                onClick={() => {
                                                    setRange("5y");
                                                }}
                                            >
                                                5y
                                            </Button>{" "}
                                            <Button
                                                variant="outline-warning"
                                                onClick={() => {
                                                    setRange("10y");
                                                }}
                                            >
                                                10y
                                            </Button>{" "}
                                        </ButtonGroup>{" "}
                                    </ButtonToolbar>
                                    <HeikinAshi data={data} range={range} />
                                </div>
                            )}
                            {chartType === "AreaChart" && (
                                <AreaChart data={data} updown={updown} />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ChartBoard;
