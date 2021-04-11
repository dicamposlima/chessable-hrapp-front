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
import Departments from '../../classes/Departments/Departments'
// styles
import headerStyle from '../../styles/header'
import buttonsStyle from '../../styles/buttons'
import tablesStyle from '../../styles/tables'

const useStyles = makeStyles((theme) => ({
    ...tablesStyle(),
    ...headerStyle(),
    ...buttonsStyle(theme, green, grey)
}));
  
const DepartmentsList = props => {
    const classes = useStyles();
    const [searchingData, setSearchingData] = React.useState(false);
    const [erro, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(null);

    // open modal to delete
    const [openModalDelete, setOpenModalDelete] = React.useState(false);
    const [idDepartmentDelete, setIdDepartmentDelete] = React.useState(null);
    const closeModal = () => {
        setOpenModalDelete(false)
    };
    const deleteDepartment = () => {
        setError("")
        if(setIdDepartmentDelete){
            Departments.delete(idDepartmentDelete)
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

    // department list
    const list = () => {
        setDepartments([])
        setSearchingData(true)
        setError("")
        Departments.list()
        .then((result) => {
            setDepartments(result.data.departments || [])
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
    const [departments, setDepartments] = React.useState([]);
    React.useEffect(() => {
        list()        
    }, [])

    return (
        <React.Fragment>
            {openModalDelete ? <Modal
                                    actionModal={deleteDepartment}
                                    closeModal={closeModal}
                                    dialogTitle={"Confirm"}
                                    dialogContentText={"Delete item?"} />  :""}
            <LayoutNavBar loading={searchingData}  loadingMessage="Searching data...">
                <Box component="div" className={classes.header}>
                    <Header title={"Departments"}/>
                    <LinkWrapper props={{ 'to': "/departments-add" }}>
                        <Fab color="primary">
                            <AddIcon />
                        </Fab>
                    </LinkWrapper>
                </Box>
                <CustomDivider />
                {erro ? <AlertsError>{erro}</AlertsError>: ""}
                {success ? <AlertsSuccess>{success}</AlertsSuccess>: ""}
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell><strong>Description</strong></TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            departments.length > 0
                            ?
                                departments.map((department) => (
                                <TableRow key={department.id}>
                                    <TableCell component="th" scope="row">{department.name}</TableCell>
                                    <TableCell component="th" scope="row">{department.description.substr(0, 120)}...</TableCell>
                                    <TableCell align="right">
                                        <Box component="span" m={1}>
                                            <LinkWrapper props={{ 'to': `departments-details/${department.id}`}}>
                                                <Button variant="contained" className={classes.info}>
                                                    <InfoIcon className={classes.actions_buttons}/>
                                                </Button>
                                            </LinkWrapper>
                                        </Box>
                                        <Box component="span" m={1}>
                                            <LinkWrapper props={{ 'to': `departments-edit/${department.id}`}}>
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
                                                        setIdDepartmentDelete(department.id);
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

export default DepartmentsList;
