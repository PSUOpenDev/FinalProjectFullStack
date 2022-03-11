import { 
	Button, 
	ButtonGroup, 
	ButtonToolbar, 
	Spinner 
} from 'react-bootstrap'
import React, { 
	useEffect, 
	useState, 
	useContext 
} from 'react'
import GlobalContext from '../../../lib_client/globalContext'
import AreaChart from '../Charts/AreaChart'
import HeikinAshi from '../Charts/HeikinAshi'
import PropTypes from 'prop-types'
import getStockChart from '../../../lib_client/getStockChart'


ChartBoard.propTypes = {
	selectedStock: PropTypes.object.isRequired,
	chartType: PropTypes.string,
	showStockName: PropTypes.bool,
	dataRange: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,
	updown: PropTypes.number,
}


ChartBoard.defaultProps = {
	chartType: 'AreaChart',
	showStockName: false,
	dataRange: '3mo',
	updown: 0,
}


function ChartBoard({
	selectedStock,
	showStockName,
	chartType,
	dataRange,
	width,
	height,
	updown,
}) {
	const [symbol, setSymbol] = useState(selectedStock.symbol)
	const [range, setRange] = useState(dataRange)
	const global = useContext(GlobalContext)
	const isLoading = false
	const [data, setData] = useState([])

	useEffect(() => {
		;(async () => {
			if (global.selectedStock) {
				console.log('In chart see', global.selectedStock)

				let res = await getStockChart(global.selectedStock.symbol, range)
				console.log('we have this res =', res)

				if (res.success && res.data) setSymbol(global.selectedStock)
				console.log('we have this data', res.data[0].history)

				setData(res.data[0].history)
			}
		})()
	}, [range, global.selectedStock])

	return (
		<>
			<div style={{maxWidth:1024}}>
				{ isLoading && <Spinner animation="border" /> }

				{ isLoading === false && data != null && data.length > 3 && (
					<div>
						{ symbol && showStockName && (
							<h6>
								{' '}
								{symbol.symbol + ' (' + symbol.name + ')'}
							</h6>
						)}
						<div >
							{chartType === 'HeikinAshi' && (
								<div >
									<ButtonToolbar
										variant="outline-primary"
										size={'sm'}
										className="m-2"
									>
										<ButtonGroup size={'sm'}>
											<Button
												variant="outline-warning"
												onClick={() => {
													setRange('1d')
												}}
											>
												1d
											</Button>{' '}
											<Button
												variant="outline-warning"
												onClick={() => {
													setRange('1mo')
												}}
											>
												1mo
											</Button>{' '}
											<Button
												variant="outline-warning"
												onClick={() => {
													setRange('3mo')
												}}
											>
												3mo
											</Button>{' '}
											<Button
												variant="outline-warning"
												onClick={() => {
													setRange('6mo')
												}}
											>
												6mo
											</Button>{' '}
											<Button
												variant="outline-warning"
												onClick={() => {
													setRange('1y')
												}}
											>
												1y
											</Button>{' '}
											<Button
												variant="outline-warning"
												onClick={() => {
													setRange('5y')
												}}
											>
												5y
											</Button>{' '}
											<Button
												variant="outline-warning"
												onClick={() => {
													setRange('10y')
												}}
											>
												10y
											</Button>{' '}
										</ButtonGroup>{' '}
									</ButtonToolbar>
									<HeikinAshi data={data} range={range} width={700} />
								</div>
							)}
							{chartType === 'AreaChart' && (
								<AreaChart data={data} updown={updown}/>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default ChartBoard
