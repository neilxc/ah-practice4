import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import loginForm from '../Common/form/setup/loginFormSetup';
import RegisterForm from "../Components/Auth/RegisterForm";

const LoggedOutMenu = ({openModal}) => {
    return (
        <Menu.Item position="right">
            <Button onClick={() => openModal('LoginModal', {loginForm})} basic inverted content="Login" />
            <Button
                onClick={() => openModal({
                    component: <RegisterForm/>,
                    header: 'Register for the Activity Hub'
                })}
                basic
                inverted
                content="Register"
                style={{ marginLeft: '0.5em' }}
            />
        </Menu.Item>
    )
};

export default LoggedOutMenu;