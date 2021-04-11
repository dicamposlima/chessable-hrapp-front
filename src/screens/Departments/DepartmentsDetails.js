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
import Departments from '../../classes/Departments/Departments'
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

const DepartmentsDetails = props => {
    let { id } = useParams();
    const classes = useStyles();
    const [searchingData, setSearchingData] = React.useState(true);
    const [searchingDataMensagem, setSearchingDataMensagem] = React.useState("Searching data...");

    const [error, setError] = React.useState(null);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    // data to show in details
    React.useEffect(() => {
        setError("")
        setSearchingDataMensagem("Searching data...")
        Departments.details(id)
        .then((result) => {
            setSearchingData(false)
            setName(result.data.department[0].name || "");
            setDescription(result.data.department[0].description || "");
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
            <LayoutNavBar loading={searchingData}  loadingMessage={searchingDataMensagem}>
                <Box component="div" className={classes.header}>
                    <Header title={"Departments - Details"}/>
                    <LinkWrapper props={{ 'to': "/departments-list" }}>
                        <Fab color="primary">
                            <ArrowBackIcon />
                        </Fab>
                    </LinkWrapper>
                </Box>
                <CustomDivider />
                {
                    error
                    ?
                    <Box component="div">
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Alert severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                    {error}
                                </Alert>
                            </Grid>
                        </Grid>
                        <br />
                    </Box>
                    : ""
                }
                {
                    !error
                    ?
                    <React.Fragment>
                        <Paper elevation={3} className={classes.detailsPaper}>
                            <Box component="div" className={classes.header}>
                                <LinkWrapper props={{ 'to': `/departments-edit/${id}`}}>
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
                                    value={description}
                                    id="description"
                                    name="description"
                                    label="Description"
                                    multiline
                                    disabled
                                    fullWidth
                                    rowsMax={4}
                                    />
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

export default DepartmentsDetails;