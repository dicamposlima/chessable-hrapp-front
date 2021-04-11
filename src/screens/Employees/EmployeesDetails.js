import React from 'react';
import {  useParams } from "react-router-dom";
// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import { green, grey } from '@material-ui/core/colors';
import { Alert, AlertTitle } from '@material-ui/lab';
// custom
import LinkWrapper from '../../components/UI/Links/LinkWrapper';
import LayoutNavBar from '../../components/Layout/LayoutNavBar';
import Header from '../../components/UI/Header/Header';
import CustomDivider from '../../components/UI/CustomDivider/CustomDivider';
import Employees from '../../classes/Employees/Employees'
import EmployeesStatus from '../../metadata/EmployeesStatus'
// styles
import headerStyle from '../../styles/header'
import buttonsStyle from '../../styles/buttons'
import formsStyle from '../../styles/forms'
import paperStyle from '../../styles/paper'
import rootStyle from '../../styles/root'
import flexStyle from '../../styles/flex'

const useStyles = makeStyles((theme) => ({
    ...rootStyle(theme),
    ...headerStyle(),
    ...buttonsStyle(theme, green, grey),
    ...formsStyle(theme),
    ...paperStyle(),
    ...flexStyle()
}));

const EmployeesDetails = props => {
    let { id } = useParams();
    const classes = useStyles();
    const [searchingData, setSearchingData] = React.useState(true);
    const [searchingDataMessage, setSearchingDataMessage] = React.useState("Searching data...");

    const [erro, setError] = React.useState(null);
    const [department_name, setDepartmentName] = React.useState("");
    const [name, setName] = React.useState("");
    const [position, setPosition] = React.useState("");
    const [salary, setSalary] = React.useState("");
    const [hiring_date, setHiringDate] = React.useState("");
    const [status, setStatus] = React.useState("");


    // busca os dados do employee para mostrar detalhes
    React.useEffect(() => {
        setError("")
        setSearchingDataMessage("Searching data...")
        Employees.details(id)
        .then((result) => {
            setSearchingData(false)
            setDepartmentName(result.data.employee[0].department_name || "");
            setName(result.data.employee[0].name || "");
            setPosition(result.data.employee[0].position || "");
            setSalary(result.data.employee[0].salary || "");
            setHiringDate(result.data.employee[0].hiring_date || "");
            setStatus(result.data.employee[0].status || "");
        })
        .catch((error) => {
            setSearchingData(false)
            if(error.hasOwnProperty("response")){
                setError(""+error.response.data.messages || ""+error)
            }
        });
    }, [id])

    return (
        <React.Fragment>
            <LayoutNavBar loading={searchingData}  loadingMessage={searchingDataMessage}>
                <Box component="div" className={classes.header}>
                    <Header title={"Employees - Details"}/>
                    <LinkWrapper props={{ 'to': "/employees-list" }}>
                        <Fab color="primary">
                            <ArrowBackIcon />
                        </Fab>
                    </LinkWrapper>
                </Box>
                <CustomDivider />
                {
                    erro
                    ?
                    <Box component="div">
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Alert severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                    {erro}
                                </Alert>
                            </Grid>
                        </Grid>
                        <br />
                    </Box>
                    : ""
                }
                {
                    !erro
                    ?
                    <React.Fragment>
                        <Paper elevation={3} className={classes.detailsPaper}>
                            <Box component="div" className={classes.header}>
                                <LinkWrapper props={{ 'to': `/employees-edit/${id}`}}>
                                    <Fab color="primary" size="small" className={classes.details}>
                                        <EditIcon />
                                    </Fab>
                                </LinkWrapper>
                            </Box>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <TextField 
                                        value={name}
                                        id="name"
                                        name="name"
                                        label="Name"
                                        autoFocus
                                        fullWidth
                                        disabled/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={12} lg={12}>
                                <TextField 
                                    value={position}
                                    id="position"
                                    name="position"
                                    label="Position"
                                    disabled
                                    fullWidth
                                    rowsMax={4}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={12} lg={12}>
                                <TextField 
                                    value={salary}
                                    id="salary"
                                    name="salary"
                                    label="Salary"
                                    disabled
                                    fullWidth
                                    rowsMax={4}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={3} md={3} lg={3}>
                                <TextField 
                                    value={hiring_date}
                                    id="hiring_date"
                                    name="hiring_date"
                                    label="Hiring Date"
                                    type="hiring_date"
                                    disabled
                                    className={classes.textField}
                                    InputLabelProps={{shrink: true,}}
                                />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={6} md={6} lg={6}>
                                    <TextField 
                                        value={EmployeesStatus[status]}
                                        id="status"
                                        name="status"
                                        label="Status"
                                        autoFocus
                                        fullWidth
                                        disabled/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={6} md={6} lg={6}>
                                    <TextField 
                                        value={department_name}
                                        id="department_name"
                                        name="department_name"
                                        label="Department"
                                        fullWidth
                                        disabled />
                                </Grid>
                            </Grid>
                        </Paper>
                    </React.Fragment>
                    : ""
                }
            </LayoutNavBar>
        </React.Fragment >
    );
}

export default EmployeesDetails;