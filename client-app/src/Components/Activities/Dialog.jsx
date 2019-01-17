import React, {Fragment, Component} from 'react';
import {
    Dialog,
    Button,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import Form from "./Form";
import {inject, observer} from "mobx-react";

@inject('activityStore')
@observer
class CreateDialog extends Component {

    render() {
        const {activityStore: {dialogToggle, dialogOpen, cancelFormEdit}, onActivityCreate} = this.props;
        return (
            <Fragment>
                <Button color={'inherit'} onClick={dialogToggle}>
                    Create Activity
                </Button>
                <Dialog
                    open={dialogOpen}
                    onClose={dialogToggle}
                >
                    <DialogTitle id="form-dialog-title">
                        Create a new Activity
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out the form below
                        </DialogContentText>
                        <Form
                            onSubmit={onActivityCreate}
                            cancelFormEdit={cancelFormEdit}
                        />
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

export default CreateDialog;