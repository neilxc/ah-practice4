import React, {Component} from 'react';
import {Button, Divider, Form, Header, Segment} from "semantic-ui-react";
import form from './basicFormSetup';
import TextInput from "../../Common/form/inputs/TextInput";
import DateInput from "../../Common/form/inputs/DateInput";
import {inject, observer} from "mobx-react";

@inject('authStore')
@observer
class Basic extends Component {
    state = {};

    componentDidMount() {
        form.update(this.props.authStore.currentUser);
        form.$('gender').set(this.props.authStore.currentUser.gender);
        this.setState({
            value: this.props.authStore.currentUser.gender
        })
    }

    handleChange = (e, {value}) => {
        this.setState({value});
        form.$('gender').set(value);
    };

    render() {
        const {value} = this.state;
        return (
            <Segment>
                <Header dividing size={'large'} content={'Basics'}/>
                <Form>
                    <Form.Group inline>
                        <label>Gender</label>
                        <Form.Radio
                            label={'Male'}
                            value={'male'}
                            checked={value === 'male'}
                            onChange={this.handleChange}
                        />
                        <Form.Radio
                            label={'Female'}
                            value={'female'}
                            checked={value === 'female'}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <DateInput field={form.$('dateOfBirth')} width={8} showTimeSelect={false}/>
                    <TextInput field={form.$('city')} width={8}/>
                    <Divider/>
                    <Button size={'large'} positive content={'Update Profile'} onClick={form.onSubmit}/>
                </Form>
            </Segment>
        )
    }
}

export default Basic;