import React from 'react';
import {Button, Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";

const SignedOut = () => {
    return (
        <Menu.Item position="right">
            <Button as={Link} to={'/login'} basic inverted content="Login" />
            <Button
                as={Link} to={'/register'}
                basic
                inverted
                content="Register"
                style={{ marginLeft: '0.5em' }}
            />
        </Menu.Item>
    );
};

export default SignedOut;
