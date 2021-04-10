import React from 'react';
import Typography from '@material-ui/core/Typography';

const Header = props => {
    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom>
                {props.title}
            </Typography>
        </React.Fragment >
    );
}

export default Header;