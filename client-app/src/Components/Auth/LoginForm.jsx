import React, {Component} from 'react';
import {Button, TextField, withStyles} from "@material-ui/core";
import {inject, observer} from "mobx-react";

const styles = theme => ({
    formControl: {
        width: 500
    }
});

@withStyles(styles)
@inject('authStore', 'dialogStore')
@observer
class LoginForm extends Component {
    changeEmail = e => this.props.authStore.setEmail(e.target.value);
    changePassword = e => this.props.authStore.setPassword(e.target.value);
    
    render() {
        const {classes, authStore: {email, password, login}} = this.props;
        return (
            <form>
                <TextField
                    label="Email"
                    value={email}
                    onChange={this.changeEmail}
                    margin="normal"
                    className={classes.formControl}
                />
                <br/>
                <TextField
                    label="Password"
                    value={password}
                    type="password"
                    onChange={this.changePassword}
                    margin="normal"
                    className={classes.formControl}
                />
                <br/>
                <Button
                    color="primary"
                    variant={'contained'}
                    onClick={login}
                >
                    Login
                </Button>
                <Button
                    color="secondary"
                    variant={'contained'}
                    onClick={this.props.dialogStore.closeDialog}
                >
                    Cancel
                </Button>
            </form>
        )
    }
}

export default LoginForm;