import React from 'react';
// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Header from '../../components/UI/Header/Header';
import Box from '@material-ui/core/Box';
// custom
import LayoutNavBar from '../../components/Layout/LayoutNavBar';
// custom
import DepartmentsListHighestSalary from '../Departments/DepartmentsListHighestSalary'
import DepartmentsListWithFilter from '../Departments/DepartmentsListWithFilter'
import CustomDivider from '../../components/UI/CustomDivider/CustomDivider';
// styles
import paperStyle from '../../styles/paper'

const useStyles = makeStyles((theme) => ({
    ...paperStyle()
}));  

const Dashboard = props => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <LayoutNavBar>
                <Box component="div" className={classes.header}>
                    <Header title={"Reports"}/>
                </Box>
                <CustomDivider />
                <Paper elevation={3} className={classes.detailsPaper}>
                    <Grid container>
                        <Grid item xs={12} md={6} lg={6}>
                            <DepartmentsListHighestSalary />
                        </Grid>
                        <Grid item xs={12} md={1} lg={1}></Grid>
                        <Grid item xs={12} md={5} lg={5}>
                            <DepartmentsListWithFilter employees={2} salary={50000} />
                        </Grid>
                    </Grid>
                </Paper>                        
            </LayoutNavBar>
        </React.Fragment >
    );
}

export default Dashboard;