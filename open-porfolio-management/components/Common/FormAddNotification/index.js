import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import GlobalContext from './../../../lib_client/globalContext';
import addWatchStock from '../../../lib_client/addWatchStock';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormAddNotification({
    email,
    openDialog,
    onCloseDialog,
}) {
    const handleClose = () => {
        global.update({ ...global });
        addWatchStock(email, symbol, upperThreshold, lowerThreshold);
        onCloseDialog(false);
    };

    const global = React.useContext(GlobalContext);
    const [symbol, setSymbol] = React.useState('');
    const [upperThreshold, setUpperThreshold] = React.useState(0);
    const [lowerThreshold, setLowerThreshold] = React.useState(0);

    const handleUpperThresholdChange = (e) => {
        if (!/[a-zA-Z]/g.test(e.target.value)) {
            setUpperThreshold(e.target.value);
            const upper = parseFloat(e.target.value);
            if (symbol !== '') {
                global.watchStockList[symbol]['upperThreshold'] = upper;
            }
        }
    };

    const handleLowerThresholdChange = (e) => {
        if (!/[a-zA-Z]/g.test(e.target.value)) {
            setLowerThreshold(e.target.value);
            const lower = parseFloat(e.target.value);
            if (symbol !== '') {
                global.watchStockList[symbol]['lowerThreshold'] = lower;
            }
        }
    };

    const handleSymbolChange = (e) => {
        console.log('handleSymbolChange ', e.target.value);
        setSymbol(e.target.value);
    };

    return (
        <div>
            <Dialog
                fullScreen
                open={openDialog}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                        >
                            Notifications
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Save
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogTitle>Choose Stock</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Choose a stock to set a notification.
                    </DialogContentText>
                    <Autocomplete
                        disablePortal
                        id="combo-box-stock"
                        options={Object.keys(global.watchStockList)}
                        sx={{ width: 300 }}
                        fullWidth
                        onChange={(e) => {
                            if (e.type === 'click') {
                                setSymbol(e.target.innerText);

                                if (
                                    e.target.innerText &&
                                    e.target.innerText !== ''
                                ) {
                                    setUpperThreshold(
                                        global.watchStockList[
                                            e.target.innerText
                                        ].upperThreshold
                                    );
                                    setLowerThreshold(
                                        global.watchStockList[
                                            e.target.innerText
                                        ].lowerThreshold
                                    );
                                } else {
                                    setUpperThreshold(0);
                                    setLowerThreshold(0);
                                }
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Symbol"
                                value={symbol}
                                onChange={handleSymbolChange}
                            />
                        )}
                    />
                    <br />
                    <TextField
                        fullWidth
                        label="Upper Threshold"
                        value={upperThreshold}
                        onChange={handleUpperThresholdChange}
                    ></TextField>
                    <br /> <br />
                    <TextField
                        fullWidth
                        label="Lower Threshold"
                        value={lowerThreshold}
                        onChange={handleLowerThresholdChange}
                    ></TextField>
                </DialogContent>
            </Dialog>
        </div>
    );
}
