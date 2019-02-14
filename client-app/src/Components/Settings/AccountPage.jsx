import React from 'react';
import {Button, Form, Header, Segment} from "semantic-ui-react";
import forms from "../../Common/form/forms";
import TextInput from "../../Common/form/inputs/TextInput";
import SubmitButton from "../../Common/form/controls/SubmitButton";

const form = forms.changePassword;

const AccountPage = (props) =>
    <Segment>
        <Header dividing size={'large'} content={'Your account'}/>
        <Header sub color={'teal'} content={'Change your password'}/>
        <Form>
            <TextInput field={form.$('currentPassword')} width={8}/>
            <TextInput field={form.$('newPassword')} width={8}/>
            <TextInput field={form.$('confirmNewPassword')} width={8}/>
            <SubmitButton form={form} content={'Update Password'}/>
        </Form>

    </Segment>;
    
    export default AccountPage;