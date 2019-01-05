import React, {Fragment, Component} from 'react';
import {
    Dialog, 
    Button, 
    DialogContent, 
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import Form from "./Form";

export default class extends Component {
    
    render() {
        const {categories, onSubmit, dialogOpen, dialogToggle, activity, cancelFormEdit} = this.props;
        return (
            <Fragment>
                <Button color={'inherit'} onClick={dialogToggle}>
                    Create Activity
                </Button>
                <Dialog
                    open={dialogOpen}
                    onClose={dialogToggle}
                    activity={activity}
                >
                    <DialogTitle id="form-dialog-title">
                        Create a new Activity
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out the form below
                        </DialogContentText>
                        <Form
                            categories={categories}
                            onSubmit={onSubmit}
                            activity={activity}
                            cancelFormEdit={cancelFormEdit}
                        />
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}
