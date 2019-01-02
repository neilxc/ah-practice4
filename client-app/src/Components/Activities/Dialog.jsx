import React, {Fragment, Component} from 'react';
import {
    Dialog, 
    Button, 
    DialogContent, 
    DialogContentText, 
    DialogActions, 
    DialogTitle,
} from "@material-ui/core";
import Form from "./Form";

export default class extends Component {
    state = {
        open: false,
        activity: {
            title: '',
            description: '',
            category: '',
            city: '',
            venue: '',
            date: ''
        }
    };

    handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    };
    
    render() {
        const {open, activity: {title, description, category, venue, city, date}} = this.state;
        const {classes} = this.props;
        return (
            <Fragment>
                <Button color={'inherit'} onClick={this.handleToggle}>
                    Create Activity
                </Button>
                <Dialog
                    open={open}
                    onClose={this.handleToggle}
                >
                    <DialogTitle id="form-dialog-title">
                        Create a new Activity
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out the form below
                        </DialogContentText>
                        <Form/>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            color="primary" 
                            variant={'contained'}
                            onClick={this.handleSubmit}
                        >
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}
