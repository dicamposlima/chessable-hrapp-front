import React, { Suspense } from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
// material-ui
import CircularSpinner from './components/UI/Spinner/CircularSpinner'

const Dashboard = React.lazy(() => import('./screens/Dashboard/Dashboard'));

// Departments
const DepartmentsList = React.lazy(() => import('./screens/Departments/DepartmentsList'));
const DepartmentsAdd = React.lazy(() => import('./screens/Departments/DepartmentsAdd'));
const DepartmentsEdit = React.lazy(() => import('./screens/Departments/DepartmentsEdit'));
const DepartmentsDetails = React.lazy(() => import('./screens/Departments/DepartmentsDetails'));

// Employees
const EmployeesList = React.lazy(() => import('./screens/Employees/EmployeesList'));
const EmployeesAdd = React.lazy(() => import('./screens/Employees/EmployeesAdd'));
const EmployeesEdit = React.lazy(() => import('./screens/Employees/EmployeesEdit'));
const EmployeesDetails = React.lazy(() => import('./screens/Employees/EmployeesDetails'));

const App = props => {
    let routes = (
        <HashRouter basename={process.env.PUBLIC_URL}>
            <Route render={({ location }) => (
                <Switch location={location}>
                    <Route path="/" exact render={props => <Dashboard {...props} />} />

                     {/* Departments */ }
                     <Route path="/departments-list" exact render={props => <DepartmentsList {...props} />} />
                    <Route path="/departments-add" exact render={props => <DepartmentsAdd {...props} />} />
                    <Route path="/departments-edit/:id" exact render={props => <DepartmentsEdit {...props} />} />
                    <Route path="/departments-details/:id" exact render={props => <DepartmentsDetails {...props} />} />

                    {/* Employees */ }
                    <Route path="/employees-list" exact render={props => <EmployeesList {...props} />} />
                    <Route path="/employees-add" exact render={props => <EmployeesAdd {...props} />} />
                    <Route path="/employees-edit/:id" exact render={props => <EmployeesEdit {...props} />} />
                    <Route path="/employees-details/:id" exact render={props => <EmployeesDetails {...props} />} />

                    <Redirect to="/" />
                </Switch>
            )} />
        </HashRouter>
    );

    return (
        <div>
            <Suspense fallback={<CircularSpinner />}>{routes}</Suspense>
        </div>
    );
};

export default App;