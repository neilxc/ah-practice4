import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import registerForm from '../Components/Auth/registerFormSetup';
import loginForm from '../Components/Auth/loginFormSetup';

const LoggedOutMenu = ({openModal}) => {
    return (
        <Menu.Item position="right">
            <Button onClick={() => openModal('LoginModal', {loginForm})} basic inverted content="Login" />
            <Button
                onClick={() => openModal('RegisterModal', {registerForm})}
                basic
                inverted
                content="Register"
                style={{ marginLeft: '0.5em' }}
            />
        </Menu.Item>
    )
};

export default LoggedOutMenu;