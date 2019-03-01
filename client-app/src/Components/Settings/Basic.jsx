import React, {Component} from 'react';
import {Divider, Form, Header, Segment} from "semantic-ui-react";
import TextInput from "../../Common/form/inputs/TextInput";
import forms from '../../Common/form/forms';
import {inject, observer} from "mobx-react";
import SubmitButton from "../../Common/form/controls/SubmitButton";
import WidgetDatePicker from "../../Common/form/inputs/WidgetDatePicker";
import WidgetSelectList from "../../Common/form/inputs/WidgetSelectList";
import TextAreaInput from "../../Common/form/inputs/TextAreaInput";

const form = forms.basic;

@inject('authStore', 'userStore')
@observer
class Basic extends Component {
    componentDidMount() {
        const {gender, dateOfBirth, city, status, bio,origin} = this.props.authStore.currentUser;
        const dob = new Date(dateOfBirth);
        form.init({gender, dateOfBirth: dob, city, status, bio, origin});
    }

    render() {
        const {loading} = this.props.userStore;
        return (
            <Segment>
                <Header dividing size={'large'} content={'Basics'}/>
                <Form>
                    <Form.Group widths={'equal'}>
                        <WidgetSelectList field={form.$('gender')}/>
                        <WidgetDatePicker field={form.$('dateOfBirth')}/>
                    </Form.Group>
                    <WidgetSelectList field={form.$('status')} inline={true}/>
                    <TextAreaInput field={form.$('bio')} width={8} rows={4}/>
                    <TextInput field={form.$('city')} width={8}/>
                    <TextInput field={form.$('origin')} width={8}/>
                    <Divider/>
                    <SubmitButton form={form} content={'Update Profile'} loading={loading}/>
                </Form>
            </Segment>
        )
    }
}

export default Basic;