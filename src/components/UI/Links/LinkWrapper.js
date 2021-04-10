import React from 'react';
import { Link } from "react-router-dom";

const LinkWrapper = props => {
    return (
        <React.Fragment>
            <Link style={{ textDecoration: 'none', color: 'inherit' }}
                {...props.props}>
                {props.children}
            </Link>
        </React.Fragment>
    );
}
export default LinkWrapper;
