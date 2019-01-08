import React, {Fragment, Component} from 'react';
import {
    Dialog, 
    Button, 
    DialogContent, 
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import Form from "./Form";
import {Consumer} from '../../context';

export default class extends Component {
    
    render() {
        const {activity} = this.props;
        return (
            <Consumer>
                {({categories, onActivityCreate, dialogOpen, cancelFormEdit, dialogToggle}) =>
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
                                    onSubmit={onActivityCreate}
                                    activity={activity}
                                    cancelFormEdit={cancelFormEdit}
                                />
                            </DialogContent>
                        </Dialog>
                    </Fragment>
                }
            </Consumer>
            
        )
    }
}
