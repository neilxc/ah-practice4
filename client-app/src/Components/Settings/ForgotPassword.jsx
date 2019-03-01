import React, {Fragment} from 'react';
import {Button, Divider, Form} from "semantic-ui-react";
import {inject, observer} from "mobx-react";
import TextInput from "../../Common/form/inputs/TextInput";
import forms from '../../Common/form/forms';

const form = forms.forgotPassword;

const ForgotPasswordForm = (({authStore: {forgotPasswordTokenSent}}) => {
    console.log(form);
    return (
        <Form>
            {!forgotPasswordTokenSent &&
                <Fragment>
                    <TextInput field={form.$('email')} width={8}/>
                    <Divider/>
                    <Button 
                        size={'large'} 
                        positive 
                        content={'Send link'} 
                        onClick={form.onSubmit}
                        disabled={form.$('email').isEmpty || form.$('email').hasError}
                        loading={form.submitting}
                    />
                </Fragment>
            }
            {forgotPasswordTokenSent &&
            <p>Email sent! Please check your email for the link to reset your password</p>}
        </Form>
    )
});

export default inject('authStore')(observer(ForgotPasswordForm))
