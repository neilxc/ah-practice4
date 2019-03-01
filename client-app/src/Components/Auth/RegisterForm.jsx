import React, {Component} from 'react';
import {Button, Divider, Icon, Form} from "semantic-ui-react";
import {observer} from "mobx-react";
import TextInput from "../../Common/form/inputs/TextInput";
import forms from '../../Common/form/forms';

const form = forms.register;

@observer
class RegisterForm extends Component {
    render() {
        console.log(form);
        return (
            <Form>
                <TextInput field={form.$('username')} type={'text'}/>
                <TextInput field={form.$('email')} type={'text'}/>
                <TextInput field={form.$('password')} type={'password'}/>
                <Button
                    type='submit'
                    fluid
                    size={'large'}
                    color={'teal'}
                    onClick={form.onSubmit}
                >
                    Register
                </Button>
                <Divider horizontal>Or</Divider>
                <Button
                    type="button"
                    style={{marginBottom: '10px'}}
                    fluid
                    color="facebook"
                >
                    <Icon name="facebook"/> Login with Facebook
                </Button>

                <Button type="button" fluid color="google plus">
                    <Icon name="google plus"/>
                    Login with Google
                </Button>
            </Form>
        )
    }
}

export default RegisterForm