import React from 'react';
// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { green, grey } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
// custom
import AlertsError from '../../components/UI/Alerts/Error';
import Departments from '../../classes/Departments/Departments'
import CustomDivider from '../../components/UI/CustomDivider/CustomDivider';
// styles
import headerStyle from '../../styles/header'
import buttonsStyle from '../../styles/buttons'
import tablesStyle from '../../styles/tables'

const useStyles = makeStyles((theme) => ({
    ...tablesStyle(),
    ...headerStyle(),
    ...buttonsStyle(theme, green, grey)
}));
  
const DepartmentsListHighestSalary = props => {
    const classes = useStyles();
    const [searchingData, setSearchingData] = React.useState(false);
    const [erro, setError] = React.useState(null);
    // department list highest salary
    const list = () => {
        setDepartments([])
        setSearchingData(true)
        setError("")
        Departments.listHighestSalary()
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
            {erro ? <AlertsError>{erro}</AlertsError>: ""}
            <Box component="div" className={classes.header}>
                <Typography variant="overline" gutterBottom>Highest salary per Department</Typography>
            </Box>
            <CustomDivider />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell align={'right'}><strong>Highest salary</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        departments.length > 0
                        ?
                            departments.map((department) => (
                            <TableRow key={department.id}>
                                <TableCell component="th" scope="row">{department.name}</TableCell>
                                <TableCell component="th" scope="row" align={'right'}>{department.highest_salary || "0.00"}</TableCell>
                            </TableRow>
                            ))
                        :
                        searchingData ?
                        <TableRow key={0}>
                            <TableCell>
                                <CircularProgress color="inherit" />
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
        </React.Fragment >
    );
}

export default DepartmentsListHighestSalary;