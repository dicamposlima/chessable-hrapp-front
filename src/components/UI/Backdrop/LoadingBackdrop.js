import React from 'react';
// material-ui
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
// estilos
import backdropEstilo from '../../../styles/backdrop'

const useStyles = makeStyles((theme) => ({
    ...backdropEstilo(theme)
}));

export default function LoadingBackdrop(props) {
    const classes = useStyles();

    if (props.loading) {
        return (
            <React.Fragment>
                <Backdrop className={classes.backdrop} open={true}>
                    <Box position="relative" display="inline-flex" style={{ width: '100%' }}>
                        <Box
                            top={0}
                            left={0}
                            bottom={0}
                            right={0}
                            position="absolute"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexDirection="column"
                        ><CircularProgress color="inherit" />
                            <Typography variant="h6" component="div" style={{ color: '#FFFFFF' }}>
                                {props.mensagem}
                            </Typography>
                        </Box>
                    </Box>
                </Backdrop>
                {props.children}
            </React.Fragment>
        );
    } else {
        return props.children
    }
}
