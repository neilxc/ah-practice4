import React, {Component} from 'react';
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import LoginForm from "../Auth/LoginForm";

@inject('dialogStore')
@observer
class AppDialog extends Component {
    render() {
        const {dialogStore: {dialogOpen, closeDialog}} = this.props;
        return (
            <Dialog
                open={dialogOpen}
                onClose={closeDialog}
            >
                <DialogTitle id="form-dialog-title">
                    Login to the App
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the form below to login
                    </DialogContentText>
                    <LoginForm/>
                </DialogContent>
            </Dialog>
        )
    }
}

export default AppDialog;