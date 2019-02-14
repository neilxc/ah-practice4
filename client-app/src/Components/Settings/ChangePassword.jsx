import React, {Component} from 'react';
import {Button, Divider, Form, Header, Segment, Grid} from "semantic-ui-react";
import MobxReactForm from "mobx-react-form";
import queryString from 'query-string';
import authStore from '../Auth/authStore';
import TextInput from "../../Common/form/inputs/TextInput";
import {inject, observer} from "mobx-react";

const fields = {
    email: {
        label: 'Email',
        placeholder: 'Please enter your email address',
    },
    password: {
        label: 'Password',
        placeholder: 'Please enter your new password',
        type: 'password'
    },
    confirmPassword: {
        label: 'Confirm Password',
        placeholder: 'Please confirm your new password',
        type: 'password'
    },
    code: {}

};

const hooks = {
    onSuccess(form) {
        authStore.updatePassword(form.values())
            .then(() => {
                console.log('form submitted successfully')
            })
            .catch((err) => {
                console.log(err)
            })

    },
    onError(form) {
        alert('Form has errors!');
        // get all form errors
        console.log('All form errors', form.errors());
    }
};

const form = new MobxReactForm({fields}, {hooks});

@inject('authStore')
@observer
class ChangePassword extends Component {
    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        form.$('code').set(qs.code);
    }

    render() {
        return (
            <Grid>
                <Grid.Column width={8}>
                    <Segment>
                        <Header dividing size={'large'} content={'Reset Password'}/>
                        <p>Please complete the following form to reset your password</p>
                        <Form>
                            <TextInput field={form.$('email')} width={8}/>
                            <TextInput field={form.$('password')} width={8}/>
                            <TextInput field={form.$('confirmPassword')} width={8}/>
                            <Divider/>
                            <Button size={'large'} positive content={'Update Password'} onClick={form.onSubmit}/>
                            {this.props.authStore.passwordUpdatedSuccess &&
                                <p>Whoop!  Password updated successfully... you can now login with new password</p>
                            }
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

export default ChangePassword;