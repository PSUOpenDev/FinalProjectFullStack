//Source: https://codesandbox.io/s/github/rrag/react-stockcharts-examples2/tree/master/examples/HeikinAshi
//More references: https://github.com/rrag/react-stockcharts-examples2

import {
    AreaSeries,
    BarSeries,
    CandlestickSeries,
    LineSeries,
} from "react-stockcharts/lib/series";
import { Chart, ChartCanvas } from "react-stockcharts";
import {
    CrossHairCursor,
    CurrentCoordinate,
    EdgeIndicator,
    MouseCoordinateX,
    MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import {
    MovingAverageTooltip,
    OHLCTooltip,
} from "react-stockcharts/lib/tooltip";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { ema, heikinAshi, sma } from "react-stockcharts/lib/indicator";

import PropTypes from "prop-types";
import React from "react";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { fitWidth } from "react-stockcharts/lib/helper";
import { format } from "d3-format";
import { last } from "react-stockcharts/lib/utils";
import { timeFormat } from "d3-time-format";

class HeikinAshi extends React.Component {
    render() {
        const ha = heikinAshi();
        const ema20 = ema()
            .id(0)
            .options({ windowSize: 20 })
            .merge((d, c) => {
                d.ema20 = c;
            })
            .accessor((d) => d.ema20);

        const ema50 = ema()
            .id(2)
            .options({ windowSize: 50 })
            .merge((d, c) => {
                d.ema50 = c;
            })
            .accessor((d) => d.ema50);

        const smaVolume50 = sma()
            .id(3)
            .options({ windowSize: 50, sourcePath: "volume" })
            .merge((d, c) => {
                d.smaVolume50 = c;
            })
            .accessor((d) => d.smaVolume50);

        const { type, data: initialData, width, ratio, range } = this.props;

        const calculatedData = smaVolume50(ema50(ema20(ha(initialData))));
        const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
            (d) => d.date
        );
        const { data, xScale, xAccessor, displayXAccessor } =
            xScaleProvider(calculatedData);

        const start = xAccessor(last(data));
        const end = xAccessor(data[Math.max(0, data.length - 150)]);
        const xExtents = [start, end];

        return (
            <ChartCanvas
                height={400}
                ratio={ratio}
                width={width}
                margin={{ left: 50, right: 70, top: 10, bottom: 30 }}
                type={type}
                seriesName="MSFT"
                data={data}
                xScale={xScale}
                xAccessor={xAccessor}
                displayXAccessor={displayXAccessor}
                xExtents={xExtents}
            >
                <Chart
                    id={1}
                    yExtents={[
                        (d) => [d.high, d.low],
                        ema20.accessor(),
                        ema50.accessor(),
                    ]}
                    padding={{ top: 10, bottom: 20 }}
                >
                    <XAxis axisAt="bottom" orient="bottom" />
                    <YAxis axisAt="right" orient="right" ticks={5} />
                    <MouseCoordinateY
                        at="right"
                        orient="right"
                        displayFormat={format(".1f")}
                    />

                    <CandlestickSeries />
                    <LineSeries
                        yAccessor={ema20.accessor()}
                        stroke={ema20.stroke()}
                    />
                    <LineSeries
                        yAccessor={ema50.accessor()}
                        stroke={ema50.stroke()}
                    />

                    <CurrentCoordinate
                        yAccessor={ema20.accessor()}
                        fill={ema20.stroke()}
                    />
                    <CurrentCoordinate
                        yAccessor={ema50.accessor()}
                        fill={ema50.stroke()}
                    />

                    <EdgeIndicator
                        itemType="last"
                        orient="right"
                        edgeAt="right"
                        yAccessor={ema20.accessor()}
                        fill={ema20.fill()}
                    />
                    <EdgeIndicator
                        itemType="last"
                        orient="right"
                        edgeAt="right"
                        yAccessor={ema50.accessor()}
                        fill={ema50.fill()}
                    />
                    <EdgeIndicator
                        itemType="last"
                        orient="right"
                        edgeAt="right"
                        yAccessor={(d) => d.close}
                        fill={(d) => (d.close > d.open ? "#6BA583" : "#FF0000")}
                    />
                    <EdgeIndicator
                        itemType="first"
                        orient="left"
                        edgeAt="left"
                        yAccessor={ema20.accessor()}
                        fill={ema20.fill()}
                    />
                    <EdgeIndicator
                        itemType="first"
                        orient="left"
                        edgeAt="left"
                        yAccessor={ema50.accessor()}
                        fill={ema50.fill()}
                    />
                    <EdgeIndicator
                        itemType="first"
                        orient="left"
                        edgeAt="left"
                        yAccessor={(d) => d.close}
                        fill={(d) => (d.close > d.open ? "#6BA583" : "#FF0000")}
                    />

                    <OHLCTooltip origin={[-40, 0]} />
                    <MovingAverageTooltip
                        onClick={(e) => console.log(e)}
                        origin={[-38, 15]}
                        options={[
                            {
                                yAccessor: ema20.accessor(),
                                type: "EMA",
                                stroke: ema20.stroke(),
                                windowSize: ema20.options().windowSize,
                            },
                            {
                                yAccessor: ema50.accessor(),
                                type: "EMA",
                                stroke: ema50.stroke(),
                                windowSize: ema50.options().windowSize,
                            },
                        ]}
                    />
                </Chart>
                <Chart
                    id={2}
                    yExtents={[(d) => d.volume, smaVolume50.accessor()]}
                    height={150}
                    origin={(w, h) => [0, h - 150]}
                >
                    <YAxis
                        axisAt="left"
                        orient="left"
                        ticks={5}
                        tickFormat={format(".2s")}
                    />
                    <MouseCoordinateX
                        at="bottom"
                        orient="bottom"
                        displayFormat={
                            range !== "1d"
                                ? timeFormat("%Y-%m-%d")
                                : timeFormat("%H:%M:%S")
                        }
                    />
                    <MouseCoordinateY
                        at="left"
                        orient="left"
                        displayFormat={format(".4s")}
                    />

                    <BarSeries
                        yAccessor={(d) => d.volume}
                        fill={(d) => (d.close > d.open ? "#6BA583" : "#FF0000")}
                    />
                    <AreaSeries
                        yAccessor={smaVolume50.accessor()}
                        stroke={smaVolume50.stroke()}
                        fill={smaVolume50.fill()}
                    />

                    <CurrentCoordinate
                        yAccessor={smaVolume50.accessor()}
                        fill={smaVolume50.stroke()}
                    />
                    <CurrentCoordinate
                        yAccessor={(d) => d.volume}
                        fill="#9B0A47"
                    />

                    <EdgeIndicator
                        itemType="first"
                        orient="left"
                        edgeAt="left"
                        yAccessor={(d) => d.volume}
                        displayFormat={format(".4s")}
                        fill="#0F0F0F"
                    />
                    <EdgeIndicator
                        itemType="last"
                        orient="right"
                        edgeAt="right"
                        yAccessor={(d) => d.volume}
                        displayFormat={format(".4s")}
                        fill="#0F0F0F"
                    />
                    <EdgeIndicator
                        itemType="first"
                        orient="left"
                        edgeAt="left"
                        yAccessor={smaVolume50.accessor()}
                        displayFormat={format(".4s")}
                        fill={smaVolume50.fill()}
                    />
                    <EdgeIndicator
                        itemType="last"
                        orient="right"
                        edgeAt="right"
                        yAccessor={smaVolume50.accessor()}
                        displayFormat={format(".4s")}
                        fill={smaVolume50.fill()}
                    />
                </Chart>
                <CrossHairCursor />
            </ChartCanvas>
        );
    }
}

HeikinAshi.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
    range: PropTypes.string,
};

HeikinAshi.defaultProps = {
    type: "svg",
    range: "1d",
};

HeikinAshi = fitWidth(HeikinAshi);

export default HeikinAshi;