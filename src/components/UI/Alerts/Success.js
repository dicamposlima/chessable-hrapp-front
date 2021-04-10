import React from 'react';
// material-ui
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Alert, AlertTitle } from '@material-ui/lab';

export default function AlertSuccess(props) {
        return (
            <React.Fragment>
                <Box component="div">
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Alert severity="success">
                                    <AlertTitle>Success</AlertTitle>
                                        {props.children}
                                </Alert>
                            </Grid>
                        </Grid>
                        <br />
                    </Box>
            </React.Fragment>
        );
}
