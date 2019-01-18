import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import LoginDialog from "./LoginDialog";
import CreateActivityDialog from "./CreateActivityDialog";

const dialogContentLookup = {
    LoginDialog,
    CreateActivityDialog
};

@inject('dialogStore')
@observer    
class DialogManager extends Component {
    render() {
        const {currentDialog} = this.props.dialogStore;
        let renderedDialog;
        
        if (currentDialog) {
            const Dialog = dialogContentLookup[currentDialog];
            
            renderedDialog = <Dialog />
        }
        
        return <span>{renderedDialog}</span>
    }
}

export default DialogManager;