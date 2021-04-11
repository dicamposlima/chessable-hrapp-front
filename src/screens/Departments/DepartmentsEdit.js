import React from 'react';
import { useParams} from "react-router-dom";
// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { green, grey } from '@material-ui/core/colors';
// libraries
import cloneDeep from 'lodash/cloneDeep'
// custom
import LinkWrapper from '../../components/UI/Links/LinkWrapper';
import LayoutNavBar from '../../components/Layout/LayoutNavBar';
import Header from '../../components/UI/Header/Header';
import CustomDivider from '../../components/UI/CustomDivider/CustomDivider';
import AlertsError from '../../components/UI/Alerts/Error';
import AlertsSuccess from '../../components/UI/Alerts/Success';
import Departments from '../../classes/Departments/Departments'
// styles
import headerStyle from '../../styles/header'
import buttonsStyle from '../../styles/buttons'
import formsStyle from '../../styles/forms'
import paperStyle from '../../styles/paper'
import rootStyle from '../../styles/root'
// Form
import FormValidation from '../../classes/Forms/Validations';
import ErrorMessages from '../../components/Forms/ErrorMessages'
import DepartmentsEditValidationRules from './DepartmentsEditValidationRules';

let form = null
const ErrorMessagesInitialValues = [{
    "name": null,
    "description": null,
}]

const useStyles = makeStyles((theme) => ({
    ...rootStyle(theme),
    ...headerStyle(),
    ...buttonsStyle(theme, green, grey),
    ...formsStyle(theme),
    ...paperStyle()
}));

const DepartmentsEdit = props => {
    let { id } = useParams();
    const classes = useStyles();
    const [searchingData, setSearchingData] = React.useState(true);
    const [searchingDataMensagem, setSearchingDataMensagem] = React.useState("Searching data...");

    // Form
    const [success, setSuccess] = React.useState(null);
    const [erro, setError] = React.useState(null);
    const [valid, setValido] = React.useState(true);
    const [fields, setFields] = React.useState([]);
    const [errorMessages, setErrorMessages] = React.useState(cloneDeep(ErrorMessagesInitialValues));
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const validField = (valor, name) => {
        form.validField(valor, name)
        setErrorMessages(form.errorMessages)
    }
    const submitForm = event => {        
        event.preventDefault();
        setError("")
        form.validField(name, "name")
        form.validField(description, "description")
        setErrorMessages(form.errorMessages)
        if(valid){
            setErrorMessages("")
        }        
        setValido(form.valid)
        if (form.valid) {
            setSearchingData(true)
            setSearchingDataMensagem("Saving data...")
            let data = {
                "name": name,
                "description": description,
            }
            Departments.update(id, data)
                .then((result) => {
                    setSearchingData(false)
                    setSuccess(""+result.data.messages)
                })
                .catch((error) => {
                    setSearchingData(false)
                    setError(""+error.response.data.messages || ""+error)
                });
        }
    };
  

    // data to edit
    React.useEffect(() => {
        setError("")
        form = new FormValidation(fields)
        Departments.details(id)
        .then((result) => {
            setSearchingData(false)
            setName(result.data.department[0].name || "");
            setDescription(result.data.department[0].description || "");
            setFields(DepartmentsEditValidationRules)
        })
        .catch((error) => {
            setSearchingData(false)
            if(error.hasOwnProperty("response")){
                setError(""+error.response.data.messages || ""+error)
            }
        });
    }, [id, fields])

    return (
        <React.Fragment>
            <LayoutNavBar loading={searchingData}  loadingMessage={searchingDataMensagem}>
                <Box component="div" className={classes.header}>
                    <Header title={"Departments - Edit"}/>
                    <LinkWrapper props={{ 'to': "/departments-list" }}>
                        <Fab color="primary">
                            <ArrowBackIcon />
                        </Fab>
                    </LinkWrapper>
                </Box>
                <CustomDivider />
                {erro ? <AlertsError>{erro}</AlertsError>: ""}
                {success ? <AlertsSuccess>{success}</AlertsSuccess>: ""}
                <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={submitForm}>
                <Paper elevation={3} className={classes.detailsPaper}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                                <TextField 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    color={errorMessages['name'] ? 'secondary' : 'primary'}
                                    helperText={<ErrorMessages errorMessages={errorMessages['name']} />}
                                    error={errorMessages['name'] ? true : false}
                                    onInput={(e) => validField(e.target.value, e.target.name)}
                                    id="name"
                                    name="name"
                                    label="Name"
                                    fullWidth
                                    required/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                            <TextField 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                color={errorMessages['description'] ? 'secondary' : 'primary'}
                                helperText={<ErrorMessages errorMessages={errorMessages['description']} />}
                                error={errorMessages['description'] ? true : false}
                                onInput={(e) => validField(e.target.value, e.target.name)}
                                id="description"
                                name="description"
                                label="Description"
                                multiline
                                required
                                fullWidth
                                rowsMax={4}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                    <Grid container spacing={3}>
                        <Grid item xs={6} md={6} lg={6}>
                            <Box component="span" m={1}>
                            <LinkWrapper props={{ 'to': "/departments-list" }}>
                                <Button variant="contained" color="secondary">Cancel</Button>
                            </LinkWrapper>
                            </Box>
                            <Box component="span" m={1}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className={classes.btnSave}>Save</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </LayoutNavBar>
        </React.Fragment >
    );
}

export default DepartmentsEdit;