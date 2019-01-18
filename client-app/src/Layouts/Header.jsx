import React, {Component} from 'react';
import {AppBar, Toolbar, Typography, Button} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import DialogManager from "../Components/Dialogs/DialogManager";

const styles = {
    flex: {
        flex: 1
    }
};

@inject('dialogStore', 'activityStore')
@observer
class Header extends Component {
    render() {
        const {openDialog} = this.props.dialogStore;
        return (
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant={'h5'} color={'inherit'} style={styles.flex}>
                        Activity Hub
                    </Typography>
                    <Button color="inherit" 
                            onClick={() => openDialog('LoginDialog')}
                    >
                        Login
                    </Button>
                    <Button color={'inherit'} 
                            onClick={() => openDialog('CreateActivityDialog')}
                    >
                        Create Activity
                    </Button>
                    <DialogManager/>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Header;
