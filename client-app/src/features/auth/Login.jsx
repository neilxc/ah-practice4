import React, {Component} from 'react';
import {Form} from "formsy-semantic-ui-react";
import {Button, Grid, Header, Label, Segment} from "semantic-ui-react";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";

@inject('authStore')
@observer
@withRouter
class Login extends Component {

    handleSubmit = (values) => {
        console.log(values);
        this.props.authStore.login(values)
            .then(() => this.props.history.replace('/counter'));
    };

    render() {
        const errorLabel = <Label color={'red'} pointing/>;
        return (
            <Grid centered>
                <Grid.Column width={6}>
                    <Header content={'Login to CoreVents'} textAlign={'center'} size={'large'}/>
                    <Form size={'large'} onValidSubmit={this.handleSubmit}>
                        <Segment>
                            <Form.Input
                                name={'email'}
                                label={'Email'}
                                validations={'isEmail'}
                                validationErrors={{
                                    isEmail: 'Email not valid',
                                    isDefaultRequiredValue: 'Email is required'
                                }}
                                required
                                errorLabel={errorLabel}
                            />
                            <Form.Input
                                name={'password'}
                                label={'Password'}
                                type={'password'}
                                required={true}
                                validationErrors={{isDefaultRequiredValue: 'Password is required'}}
                                errorLabel={errorLabel}
                            />
                            <Button fluid size="large" color="teal">
                                Login
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>

            </Grid>

        );
    }
}

export default Login;