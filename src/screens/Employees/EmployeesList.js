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
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
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
import Search from '../../components/Search/Search'
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
    const [offset, setOffset] = React.useState(0);
    const [pageShowed, setPageShowed] = React.useState(1);
    const [pageTotal, setPageTotal] = React.useState(0);
    const [searchingData, setSearchingData] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(null);
    const [showSalary, setShowSalary] = React.useState(false);
    const [employees, setEmployees] = React.useState([]);
    const [employeesTotal, setEmployeesTotal] = React.useState(0);
    const [openModalDelete, setOpenModalDelete] = React.useState(false);
    const [idEmployeeDelete, setIdEmployeeDelete] = React.useState(null);
    const [search_value, setSearchValue] = React.useState(null);
    const [order, setListColumnOrder] = React.useState({'field':null, 'dir':null});
    
    const setListOrder = (field) => {
        setListColumnOrder({
            'field':field,
            'dir': !order.dir || order.dir === 'DESC' ? 'ASC' : 'DESC'
        })
    }

    const search = (value) => {
        setSearchValue(value)
    }
    
    const setPageBack = () => {
        setOffset(offset > Employees.page_limt ? offset-Employees.page_limt : 0)
        setPaginationDescription()
    }

    const setPageForward = () => {
        setOffset(pageShowed < pageTotal ? offset+Employees.page_limt : offset)
        setPaginationDescription()
    }

    const setPaginationDescription = () => {
        setPageShowed(Math.ceil(offset/Employees.page_limt+1))
        setPageTotal(Math.ceil(employeesTotal/Employees.page_limt))
    }

    // abrir modal para delete
    const closeModal = () => {
        setOpenModalDelete(false)
    };
    const deleteEmployee = () => {
        setError("")
        if(setIdEmployeeDelete){
            Employees.delete(idEmployeeDelete)
                .then((result) => {
                    setSearchingData(false)
                    setSuccess(""+result.data.messages)
                    list()
                })
                .catch((error) => {
                    setSearchingData(false)
                    if(error.hasOwnProperty("response")){
                        setError(""+error.response.data.messages || ""+error)
                    }
                });
        }
    };

   // employees list
    const list = () => {
        setEmployees([])
        setEmployeesTotal(0)
        setSearchingData(true)
        setError("")
        Employees.list(offset, search_value, order)
        .then((result) => {
            setEmployeesTotal(result.data.total)
            setEmployees(result.data.employees || [])
            setSearchingData(false)
        })
        .catch((error) => {
            setSearchingData(false)
            if(error.hasOwnProperty("response")){
                if(!error.response){
                    setError(""+error.response.data.messages || ""+error)
                }
            }
        });
        
    };
        
    React.useEffect(() => {
        list()
    }, [offset, search_value, order])

    React.useEffect(() => {
        setPaginationDescription()
    }, [employees])

    return (
        <React.Fragment>
            {openModalDelete ? <Modal
                                    actionModal={deleteEmployee}
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
                <Search search={search}/>
	            <div>Filtered by: {search_value}</div>
                <div elevation={3} style={{ display: "flex", justifyContent: "flex-end", padding: "5px 0px" }}>
                    <Typography variant="subtitle2" gutterBottom style={{paddingRight: "15px"}} >{pageShowed} - {pageTotal}</Typography>
                    <ArrowBackIosIcon fontSize={"small"} style={{ cursor: 'pointer' }} onClick={() => setPageBack()} />
                    <ArrowForwardIosIcon fontSize={"small"} style={{ cursor: 'pointer' }} onClick={() => setPageForward()} />
                </div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setListOrder('id')}><strong>ID</strong></TableCell>
                                <TableCell style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setListOrder('name')}><strong>Name</strong></TableCell>
                                <TableCell style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setListOrder('position')}><strong>Position</strong></TableCell>
                                <TableCell style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setListOrder('hiring_date')}><strong>Hiring Date</strong></TableCell>
                                <TableCell style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setListOrder('department_name')}><strong>Department</strong></TableCell>
                                <TableCell style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                    <strong  onClick={() => setListOrder('salary')}>Salary</strong>
                                    {showSalary
                                    ?
                                    <VisibilityOffIcon style={{ cursor: 'pointer' }} onClick={() => setShowSalary(!showSalary)}/>
                                    :
                                    <VisibilityIcon style={{ cursor: 'pointer' }} onClick={() => setShowSalary(!showSalary)}/>}
                                    </TableCell>
                                <TableCell style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setListOrder('status')}><strong>Status</strong></TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            employees.length > 0
                            ?
                                employees.map((employee) => (
                                <TableRow key={employee.id}>
                                    <TableCell component="th" scope="row">{employee.id}</TableCell>
                                    <TableCell component="th" scope="row">{employee.name}</TableCell>
                                    <TableCell>{employee.position}</TableCell>
                                    <TableCell>
                                        {employee.hiring_date.split('-')[2]}
                                        {"."}
                                        {employee.hiring_date.split('-')[1]}
                                        {"."}
                                        {employee.hiring_date.split('-')[0]}
                                    </TableCell>
                                    <TableCell>{employee.department_name}</TableCell>
                                    <TableCell>{showSalary ? employee.salary : "--"}</TableCell>
                                    <TableCell>{EmployeesStatus[employee.status]}</TableCell>
                                    <TableCell align="right">
                                        <Box component="span" m={1}>
                                            <LinkWrapper props={{ 'to': `employees-details/${employee.id}`}}>
                                                <Button variant="contained" className={classes.info}>
                                                    <InfoIcon className={classes.actions_buttons}/>
                                                </Button>
                                            </LinkWrapper>
                                        </Box>
                                        <Box component="span" m={1}>
                                            <LinkWrapper props={{ 'to': `employees-edit/${employee.id}`}}>
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
                                                        setIdEmployeeDelete(employee.id);
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
                <div elevation={3} style={{ display: "flex", justifyContent: "flex-end", padding: "5px 0px" }}>
                    <Typography variant="subtitle2" gutterBottom style={{paddingRight: "15px"}} >{pageShowed} - {pageTotal}</Typography>
                    <ArrowBackIosIcon fontSize={"small"} style={{ cursor: 'pointer' }} onClick={() => setPageBack()} />
                    <ArrowForwardIosIcon fontSize={"small"} style={{ cursor: 'pointer' }} onClick={() => setPageForward()} />
                </div>
            </LayoutNavBar>
        </React.Fragment >
    );
}

export default EmployeesList;
