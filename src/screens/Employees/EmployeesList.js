import React from 'react';
// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LayoutNavBar from '../../components/Layout/LayoutNavBar';
import Header from '../../components/UI/Header/Header';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import { green, grey } from '@material-ui/core/colors';
// custom
import LinkWrapper from '../../components/UI/Links/LinkWrapper';
import CustomDivider from '../../components/UI/CustomDivider/CustomDivider';
import Modal from '../../components/UI/Modal/Modal';
import AlertsError from '../../components/UI/Alerts/Error';
import AlertsSuccess from '../../components/UI/Alerts/Success';
import Employees from '../../classes/Employees/Employees'
import EmployeesStatus from '../../metadata/EmployeesStatus'
// styles
import headerStyle from '../../styles/header'
import buttonsStyle from '../../styles/buttons'
import tablesStyle from '../../styles/tables'

const useStyles = makeStyles((theme) => ({
    ...tablesStyle(),
    ...headerStyle(),
    ...buttonsStyle(theme, green, grey)
}));
  
const EmployeesList = props => {
    const classes = useStyles();
    const [searchingData, setSearchingData] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(null);

    // abrir modal para delete
    const [openModalDelete, setOpenModalDelete] = React.useState(false);
    const [idEmployeeDelete, setIdEmployeeDelete] = React.useState(null);
    const closeModal = () => {
        setOpenModalDelete(false)
    };
    const deleteEmployee = () => {
        setError("")
        if(setIdEmployeeDelete){
            Employees.delete(idEmployeeDelete)
                .then((result) => {
                    setSearchingData(false)
                    setSuccess(""+result.data.success)
                    list()
                })
                .catch((error) => {
                    setSearchingData(false)
                    if(error.hasOwnProperty("response")){
                        setError(""+error)
                    }
                });
            
        }
    };

   // employess list
    const list = () => {
        setEmployees([])
        setSearchingData(true)
        setError("")
        Employees.list()
        .then((result) => {
            setEmployees(result.data.employees)
            setSearchingData(false)
        })
        .catch((error) => {
            setSearchingData(false)
            if(error.hasOwnProperty("response")){
                if(!error.response){
                    setError(""+error)
                }
            }
        });
        
    };
    const [employees, setEmployees] = React.useState([]);
    React.useEffect(() => {
        list()        
    }, [])

    return (
        <React.Fragment>
            {openModalDelete ? <Modal
                                    acaoModal={deleteEmployee}
                                    closeModal={closeModal}
                                    dialogTitle={"Confirm"}
                                    dialogContentText={"Delete item?"} />  :""}
            <LayoutNavBar loading={searchingData}  loadingMessage="Searching data...">
                <Box component="div" className={classes.header}>
                    <Header title={"Employees"}/>
                    <LinkWrapper props={{ 'to': "/employees-add" }}>
                        <Fab color="primary">
                            <AddIcon />
                        </Fab>
                    </LinkWrapper>
                </Box>
                <CustomDivider />
                {error ? <AlertsError>{error}</AlertsError>: ""}
                {success ? <AlertsSuccess>{success}</AlertsSuccess>: ""}
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Position</TableCell>
                                <TableCell>Hiring date</TableCell>
                                <TableCell>Leaving Date</TableCell>
                                <TableCell>Department</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            employees.length > 0
                            ?
                                employees.map((employee) => (
                                <TableRow key={employee.dados.id}>
                                    <TableCell component="th" scope="row">{employee.dados.name}</TableCell>
                                    <TableCell>{employee.dados.position}</TableCell>
                                    <TableCell>{employee.dados.hiring_date}</TableCell>
                                    <TableCell>{employee.dados.leaving_date}</TableCell>
                                    <TableCell>{employee.department.name}</TableCell>
                                    <TableCell>{EmployeesStatus[employee.dados.status]}</TableCell>
                                    <TableCell align="right">
                                        <Box component="span" m={1}>
                                            <LinkWrapper props={{ 'to': `employees-details/${employee.dados.id}`}}>
                                                <Button variant="contained" className={classes.info}>
                                                    <InfoIcon className={classes.actions_buttons}/>
                                                </Button>
                                            </LinkWrapper>
                                        </Box>
                                        <Box component="span" m={1}>
                                            <LinkWrapper props={{ 'to': `employees-edit/${employee.dados.id}`}}>
                                                <Button variant="contained" color="primary">
                                                    <EditIcon className={classes.actions_buttons}/>
                                                </Button>
                                            </LinkWrapper>
                                        </Box>
                                        <Box component="span" m={1}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => {
                                                        setOpenModalDelete(true);
                                                        setIdEmployeeDelete(employee.dados.id);
                                                    }}>
                                                <DeleteIcon className={classes.actions_buttons}/>
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                                ))
                            :
                            searchingData ?
                            <TableRow key={0}>
                                <TableCell>
                                    <Typography variant="subtitle2" gutterBottom></Typography>
                                </TableCell>
                            </TableRow>
                             : 
                            <TableRow key={0}>
                                <TableCell>
                                    <Typography variant="subtitle2" gutterBottom>No data found</Typography>
                                </TableCell>
                            </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </LayoutNavBar>
        </React.Fragment >
    );
}

export default EmployeesList;
