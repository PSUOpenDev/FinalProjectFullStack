//https://codesandbox.io/s/6ud7tv?file=/demo.js:0-823

import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';

import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Container from '@mui/material/Container';
import SearchStock from './Common/SearchStock';

import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';

import Icon from '@material-ui/core/Icon';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import FromAddStock from './Common/FormAddStock/index';

import {
    signInGoogle,
    signOutGoogle,
    getGoogleUserName,
    getProfilePicUrl,
    getGoogleUserEmail,
    GoogleCheck,
} from './Common/Firebase';
import getWatchStock from '../lib_client/getWatchStock';
import GlobalContext from '../lib_client/globalContext';
import FormAddNotification from './Common/FormAddNotification';
import { useState } from 'react';

const drawerWidth = 240;

const Layout = ({ children }) => {
    const isSignedIn = GoogleCheck();
    const global = React.useContext(GlobalContext);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [anchorE2, setAnchorE2] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isNotificationMenuOpen = Boolean(anchorE2);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuAccountClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setAnchorE2(null);
        handleMobileMenuClose();
    };

    const handleMenuSignIn = (event) => {
        setAnchorEl(event.currentTarget);
        if (isSignedIn) {
            signOutGoogle();
            global.notification = [];
            global.update({ ...global });
        } else signInGoogle();
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';

    const notificationId = 'primary-search-account-menu2';

    const [notificationList, setNotificationList] = useState([]);

    React.useEffect(() => {
        if (isSignedIn === false) {
            global.notification = [];
            global.update({ ...global });
        } else {
            setNotificationList([...global.notification]);
        }
    }, [global.notification.length]);

    React.useEffect(() => {
        if (isSignedIn === false) {
            global.watchStockList = {};
            global.notification = [];
            global.update({ ...global });
        } else {
            (async () => {
                const res = await getWatchStock(getGoogleUserEmail());
                global.watchStockList = Object.assign(
                    {},
                    ...res.data.map((x) => ({ [x.symbol]: x }))
                );

                global.update({ ...global });
            })();
        }
    }, [isSignedIn]);

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuAccountClose}
        >
            {isSignedIn ? <MenuItem>{getGoogleUserName()}</MenuItem> : ''}
            {isSignedIn ? <MenuItem>{getGoogleUserEmail()}</MenuItem> : ''}
            <MenuItem onClick={handleMenuSignIn}>
                {isSignedIn ? 'Sign Out' : 'Sign In'}
            </MenuItem>
        </Menu>
    );

    const renderNotification = (
        <Menu
            anchorEl={anchorE2}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={notificationId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={
                isNotificationMenuOpen && notificationList.length && isSignedIn
            }
            onClose={handleNotificationClose}
        >
            {notificationList.map((message, index) => {
                return (
                    <MenuItem key={index}>
                        <IconButton>
                            <NotificationsIcon /> {message}
                        </IconButton>
                    </MenuItem>
                );
            })}
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {/* <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                >
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem> */}
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={notificationList.length} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                ></IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleNotificationOpen = (event) => {
        setAnchorE2(event.currentTarget);
    };

    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [openAddNotification, setOpenAddNotification] = React.useState(false);
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                            onClick={handleDrawerOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                display: {
                                    xs: 'none',
                                    sm: 'block',
                                },
                                marginRight: '20px',
                            }}
                        >
                            Open Stock Portfolio
                        </Typography>
                        <SearchStock></SearchStock>
                        <Box sx={{ flexGrow: 1 }} />

                        <Box
                            sx={{
                                display: {
                                    xs: 'none',
                                    md: 'flex',
                                },
                            }}
                        >
                            {/* Notification */}
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                                onClick={handleNotificationOpen}
                            >
                                <Badge
                                    badgeContent={notificationList.length}
                                    color="error"
                                >
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            {/* Notification */}

                            {/* Account Menu*/}
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                {isSignedIn ? (
                                    <Icon>
                                        <img
                                            sx={{
                                                width: 4,
                                            }}
                                            src={getProfilePicUrl()}
                                        />
                                    </Icon>
                                ) : (
                                    <AccountCircle />
                                )}
                            </IconButton>
                            {/* Account Menu*/}
                        </Box>
                        {/* Mobile menu */}
                        <Box
                            sx={{
                                display: {
                                    xs: 'flex',
                                    md: 'none',
                                },
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                        {/* Mobile menu */}
                    </Toolbar>
                </AppBar>

                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open && isSignedIn}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        <ListItem button onClick={() => setOpenAddDialog(true)}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Add Stock'} />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => setOpenAddNotification(true)}
                        >
                            <ListItemIcon>
                                <NotificationAddIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Notifications'} />
                        </ListItem>
                    </List>
                </Drawer>

                <Main open={open}>
                    <Container maxWidth="xl">{children}</Container>
                </Main>
                <FromAddStock
                    email={isSignedIn ? getGoogleUserEmail() : undefined}
                    open={openAddDialog}
                    onCloseDialog={setOpenAddDialog}
                />

                <FormAddNotification
                    email={isSignedIn ? getGoogleUserEmail() : undefined}
                    openDialog={openAddNotification}
                    onCloseDialog={setOpenAddNotification}
                />
                {renderMobileMenu}
                {renderMenu}
                {renderNotification}
            </Box>
        </div>
    );
};

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const Main = styled('div', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: `${drawerWidth}px`,
        }),
    })
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default Layout;
