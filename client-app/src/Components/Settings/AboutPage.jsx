import React, {Component} from 'react';
import {Button, Divider, Form, Header, Segment} from "semantic-ui-react";
import form from "./aboutFormSetup";
import TextInput from "../../Common/form/inputs/TextInput";
import {observer} from "mobx-react";
import TextAreaInput from "../../Common/form/inputs/TextAreaInput";

@observer
class AboutPage extends Component {
    state = {};

    handleChange = (e, {value}) => {
        this.setState({value});
        form.$('status').set(value);
    };
    
    render() {
        const {value} = this.state;
        return (
            <Segment>
                <Header dividing size={'large'} content={'About Me'}/>
                <p>Complete your profile to get the most out of this site</p>
                <Form>
                    <Form.Group inline>
                        <label>Tell us your status</label>
                        <Form.Radio
                            label={'Single'}
                            value={'single'}
                            checked={value === 'single'}
                            onChange={this.handleChange}
                        />
                        <Form.Radio
                            label={'Relationship'}
                            value={'relationship'}
                            checked={value === 'relationship'}
                            onChange={this.handleChange}
                        />
                        <Form.Radio
                            label={'Married'}
                            value={'married'}
                            checked={value === 'married'}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <TextAreaInput field={form.$('bio')} width={8} rows={4}/>
                    <TextInput field={form.$('occupation')} width={8}/>
                    <TextInput field={form.$('origin')} width={8}/>
                    <Divider/>
                    <Button size={'large'} positive content={'Update Profile'} onClick={form.onSubmit}/>
                </Form>
            </Segment>
        )
    }
}

export default AboutPage;