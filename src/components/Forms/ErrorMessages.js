import React from 'react';
import Typography from '@material-ui/core/Typography';

const ErrorMessages = props => {
    return (
        <React.Fragment>
            {
            props.errorMessages
            ?
            <Typography variant="overline" gutterBottom>{props.errorMessages}</Typography>
            :
                ''
            }
        </React.Fragment>
    );
}

export default ErrorMessages