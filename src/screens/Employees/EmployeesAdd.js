import React from 'react';
import { useHistory } from "react-router-dom";
// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
import Employees from '../../classes/Employees/Employees'
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
import EmployeesAddValidationRules from './EmployeesAddValidationRules';

let form = null
const ErrorMessagesInitialValues = [{
    "id_department": null,
    "name": null,
    "position": null,
    "salary": null,
    "hiring_date": null
}]

const useStyles = makeStyles((theme) => ({
    ...rootStyle(theme),
    ...headerStyle(),
    ...buttonsStyle(theme, green, grey),
    ...formsStyle(theme),
    ...paperStyle()
}));

const EmployeesAdd = props => {
    let history = useHistory();
    const classes = useStyles();
    const [searchingData, setSearchingData] = React.useState(false);
    const [searchingDataMessage, setSearchingDataMessage] = React.useState("Searching data...");

    // Form
    form = new FormValidation(EmployeesAddValidationRules)
    const [success, setSuccess] = React.useState(null);
    const [erro, setError] = React.useState(null);
    const [valido, setValido] = React.useState(true);
    const [fields, setFields] = React.useState([]);
    const [errorMessages, setErrorMessages] = React.useState(cloneDeep(ErrorMessagesInitialValues));
    const [departments, setDepartments] = React.useState([]);
    const [id_department, setIdDepartment] = React.useState("");
    const [name, setName] = React.useState("");
    const [position, setPosition] = React.useState("");
    const [salary, setSalary] = React.useState("");
    const [hiring_date, setHiringDate] = React.useState("");

    const validField = (valor, name) => {
        form.validField(valor, name)
        setErrorMessages(form.errorMessages)
        setValido(true)
    }
    const submitForm = event => {
        event.preventDefault();
        setError("")
        form.validField(id_department, "id_department");
        form.validField(name, "name");
        form.validField(position, "position");
        form.validField(salary, "salary");
        form.validField(hiring_date, "hiring_date");
        setErrorMessages(form.errorMessages)
        setValido(form.valido)
        if (form.valido) {
            setSearchingData(true)
            setSearchingDataMessage("Saving data...")
            let dados = {
                "id_department": id_department,
                "name": name,
                "position": position,
                "salary": salary,
                "hiring_date": hiring_date,
            }
            Employees.add(dados)
                .then((result) => {
                    setSearchingData(false)
                    setSuccess(""+result.data.success)
                    setIdDepartment("");
                    setName("");
                    setPosition("");
                    setSalary("");
                    setHiringDate("");
                    history.push(`/employees-list`)
                })
                .catch((error) => {
                    setSearchingData(false)
                    setError(""+error.data.error)
                });
        }
    };

    // departments select list
    React.useEffect(() => {
        Departments.list()
        .then((result) => {
            setSearchingData(false)
            setDepartments(result.data.departments);
        })
        .catch((error) => {
            setSearchingData(false)
            if(error.hasOwnProperty("response")){
                setError(""+error)
            }
        });
    }, [])
    
    React.useEffect(() => {
        setSearchingData(false)
        setFields(EmployeesAddValidationRules)
        form = new FormValidation(fields)
    }, [fields])

    return (
        <React.Fragment>
            <LayoutNavBar loading={searchingData}  loadingMessage={searchingDataMessage}>
                <Box component="div" className={classes.header}>
                    <Header title={"Employees - Add"}/>
                    <LinkWrapper props={{ 'to': "/employees-list" }}>
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
                            <Grid item xs={4} md={4} lg={4}>
                                <FormControl
                                    required
                                    fullWidth
                                    className={classes.formControl}
                                    error={errorMessages['id_department'] ? true : false}
                                    color={errorMessages['id_department'] ? 'secondary' : 'primary'}>
                                    <InputLabel
                                        id="id_department"
                                        className={classes.inputLabel}>Department</InputLabel>
                                    <Select
                                        value={id_department}
                                        onChange={(e) => setIdDepartment(e.target.value)}
                                        onClick={(e) => validField(e.target.value, e.target.name)}
                                        name="id_department"
                                        labelId="id_department_label"
                                        id="id_department_label_id"
                                        autoFocus
                                        >
                                        {
                                            departments.map((department) => <MenuItem key={department.id} value={department.id}>{department.name}</MenuItem>)
                                        }
                                    </Select>
                                    <FormHelperText>
                                        <ErrorMessages errorMessages={errorMessages['id_department']} />
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
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
                                    autoFocus
                                    fullWidth
                                    required/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                            <TextField 
                                value={position}
                                onChange={(e) => setPosition(e.target.value.substr(0, 120))}
                                color={errorMessages['position'] ? 'secondary' : 'primary'}
                                helperText={<ErrorMessages errorMessages={errorMessages['position']} />}
                                error={errorMessages['position'] ? true : false}
                                onInput={(e) => validField(e.target.value, e.target.name)}
                                id="position"
                                name="position"
                                label="Position"
                                multiline
                                required
                                fullWidth
                                rowsMax={4}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={3} md={3} lg={3}>
                            <TextField 
                                value={hiring_date}
                                onChange={(e) => setHiringDate(e.target.value)}
                                color={errorMessages['hiring_date'] ? 'secondary' : 'primary'}
                                helperText={<ErrorMessages errorMessages={errorMessages['hiring_date']} />}
                                error={errorMessages['hiring_date'] ? true : false}
                                onInput={(e) => validField(e.target.value, e.target.name)}
                                id="hiring_date"
                                name="hiring_date"
                                label="Hiring Date"
                                type="date"
                                required
                                className={classes.textField}
                                InputLabelProps={{shrink: true,}}
                            />
                            </Grid>
                            <Grid item xs={2} md={2} lg={2}>
                                <TextField 
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                    color={errorMessages['salary'] ? 'secondary' : 'primary'}
                                    helperText={<ErrorMessages errorMessages={errorMessages['salary']} />}
                                    error={errorMessages['salary'] ? true : false}
                                    onInput={(e) => validField(e.target.value, e.target.name)}
                                    id="salary"
                                    name="salary"
                                    label="Salary"
                                    fullWidth
                                    type="number"/>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Grid container spacing={3}>
                        <Grid item xs={6} md={6} lg={6}>
                            <Box component="span" m={1}>
                            <LinkWrapper props={{ 'to': "/employees-list" }}>
                                <Button variant="contained" color="secondary"> Cancel</Button>
                            </LinkWrapper>
                            </Box>
                            <Box component="span" m={1}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className={classes.btnSave}
                                    disabled={!valido}>Save</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </LayoutNavBar>
        </React.Fragment >
    );
}

export default EmployeesAdd;