import React, {Component} from 'react';
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import LoginForm from "../Components/Auth/LoginForm";

@inject('dialogStore')
@observer
class AppDialog extends Component {
    render() {
        const {dialogStore: {dialogOpen, closeDialog}, children} = this.props;
        return (
            <Dialog
                open={dialogOpen}
                onClose={closeDialog}
            >
                <DialogTitle id="form-dialog-title">
                    Some title
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Some dialog text
                    </DialogContentText>
                    {children}
                </DialogContent>
            </Dialog>
        )
    }
}

export default AppDialog;