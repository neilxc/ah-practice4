import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Form, Button, Divider, Icon} from "semantic-ui-react";
import form from './loginFormSetup';
import TextInput from "../../Common/form/inputs/TextInput";
import {Link, withRouter} from "react-router-dom";
import ForgotPassword from "../Settings/ForgotPassword";

@withRouter
@inject('authStore', 'modalStore')
@observer
class LoginForm extends Component {
    handleForgotPassword = () => {
        this.props.modalStore.closeModal();
        this.props.history.push('/forgotPassword');
    };
    
    render() {
        const {openModal} = this.props.modalStore;
        return (
            <Form>
                <TextInput field={form.$('email')} type={'text'} label={'Email'}/>
                <TextInput field={form.$('password')} type={'password'} label={'Password'}/>
                <Button
                    onClick={form.onSubmit}
                    fluid
                    size={'large'}
                    color={'teal'}
                >
                    Login
                </Button>
                <a onClick={() =>
                    openModal({
                        component: <ForgotPassword/>,
                        header: 'Enter your email address to get a reset password link'
                    })}>
                    Forgot Password?
                </a>
                <Divider horizontal>Or</Divider>
                <Button
                    type="button"
                    style={{ marginBottom: '10px' }}
                    fluid
                    color="facebook"
                >
                    <Icon name="facebook" /> Login with Facebook
                </Button>

                <Button type="button" fluid color="google plus">
                    <Icon name="google plus" />
                    Login with Google
                </Button>
            </Form>
        )
    }
}

export default LoginForm;