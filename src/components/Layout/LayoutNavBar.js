import React from 'react';
// material-ui
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import BusinessIcon from '@material-ui/icons/Business';
// customizados
import LinkWrapper from '../UI/Links/LinkWrapper';
import LoadingBackdrop from '../UI/Backdrop/LoadingBackdrop';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    title: {
      flexGrow: 1,
    },
}));

const LayoutNavBar = props => {
    const classes = useStyles();
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };
    
    return (
        <div className={classes.root}>
            <LoadingBackdrop loading={props.loading} mensagem={props.loadingMessage}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: drawerOpen,
                    })}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: drawerOpen,
                            })}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap className={classes.title}>
                            HR App
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: drawerOpen,
                        [classes.drawerClose]: !drawerOpen,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: drawerOpen,
                            [classes.drawerClose]: !drawerOpen,
                        }),
                    }}>
                    <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <LinkWrapper props={{ 'to': "/" }}>
                            <ListItem button key={"dashboard"}>
                                    <ListItemIcon><HomeIcon /></ListItemIcon>
                                <ListItemText primary={"Dashboard"} />
                            </ListItem>
                        </LinkWrapper>
                        <LinkWrapper props={{ 'to': "/departments-list" }}>
                            <ListItem button key={"departments"}>
                                    <ListItemIcon><BusinessIcon /></ListItemIcon>
                                <ListItemText primary={"Departments"} />
                            </ListItem>
                        </LinkWrapper>
                        <LinkWrapper props={{ 'to': "/employees-list" }}>
                            <ListItem button key={"employees"}>
                                <ListItemIcon><PeopleIcon /></ListItemIcon>
                                <ListItemText primary={"Employees"} />
                            </ListItem>
                        </LinkWrapper>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {props.children}
                </main>
            </LoadingBackdrop>
        </div>
    );
}

export default LayoutNavBar;