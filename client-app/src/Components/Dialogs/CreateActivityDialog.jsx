import React, {Component} from 'react';
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import Form from "../Activities/Form";

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
                    Create a new Activity
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the form below to create a new activity
                    </DialogContentText>
                    <Form/>
                </DialogContent>
            </Dialog>
        )
    }
}

export default AppDialog;