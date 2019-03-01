import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Form, Button, Divider, Icon} from "semantic-ui-react";
import forms from '../../Common/form/forms';
import TextInput from "../../Common/form/inputs/TextInput";
import {withRouter} from "react-router-dom";
import ForgotPassword from "../Settings/ForgotPassword";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const form = forms.login;

@withRouter
@inject('authStore', 'modalStore')
@observer
class LoginForm extends Component {
    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: ''
    };
    
    handleForgotPassword = () => {
        this.props.modalStore.closeModal();
        this.props.history.push('/forgotPassword');
    };
    
    responseFacebook = async (response) => {
        console.log(response);
        const fbResponse = {
            email: response.email,
            provider: 'facebook',
            accessToken: response.accessToken,
            userImage: response.picture.data.url,
            userId: response.userID
        };
        const result = await this.props.authStore.externalLogin(fbResponse);
        console.log(result);
        // call authStore external login method...
    };
    
    render() {
        const {openModal} = this.props.modalStore;
        const {inProgress} = this.props.authStore;
        return (
            <Form>
                <TextInput field={form.$('email')} type={'text'} label={'Email'}/>
                <TextInput field={form.$('password')} type={'password'} label={'Password'}/>
                <Button
                    onClick={form.onSubmit}
                    fluid
                    size={'large'}
                    color={'teal'}
                    loading={form.submitting || inProgress}
                >
                    Login
                </Button>
                <p style={{textAlign: 'center', cursor: 'pointer', color: 'blue'}} onClick={() =>
                    openModal({
                        component: <ForgotPassword/>,
                        header: 'Enter your email address to get a reset password link'
                    })}>
                    Forgot Password?
                </p>
                <Divider horizontal>Or</Divider>
                
                <FacebookLogin
                    appId="767817496914410"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={this.responseFacebook}
                    responseType={'code'}
                    render={(props) => {
                        return (
                            <Button
                                type="button"
                                style={{ marginBottom: '10px' }}
                                fluid
                                color="facebook"
                                onClick={props.onClick}
                            >
                                <Icon name="facebook" /> Login with Facebook
                            </Button>
                        )
                    }}
                />

                <Button type="button" fluid color="google plus">
                    <Icon name="google plus" />
                    Login with Google
                </Button>
            </Form>
        )
    }
}

export default LoginForm;