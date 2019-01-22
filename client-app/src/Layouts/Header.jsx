import React, {Component, Fragment} from 'react';
import {AppBar, Toolbar, Typography, Button, Avatar} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import DialogManager from "../Components/Dialogs/DialogManager";

const styles = {
    flex: {
        flex: 1
    }
};

@inject('dialogStore', 'authStore', 'activityStore')
@observer
class Header extends Component {
    handleCreateActivityDialog = () => {
        this.props.activityStore.clearActivity();
        this.props.dialogStore.openDialog('CreateActivityDialog')
    };
    render() {
        const isLoggedIn = !!this.props.authStore.currentUser;
        const {openDialog} = this.props.dialogStore;
        const {logout, currentUser} = this.props.authStore;
        return (
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant={'h5'} color={'inherit'} style={styles.flex}>
                        Activity Hub
                    </Typography>
                    {!isLoggedIn ?
                        <Fragment>
                            <Button color="inherit"
                                    onClick={() => openDialog('LoginDialog')}
                            >
                                Login
                            </Button>
                        </Fragment>
                        :
                        <Fragment>
                            <Avatar src={currentUser.image} >
                                {currentUser.username.charAt(0).toUpperCase()}
                            </Avatar>
                            <Button color="inherit"
                                    onClick={logout}
                            >
                                Logout
                            </Button>
                            <Button color={'inherit'}
                                    onClick={() => this.handleCreateActivityDialog()}
                            >
                                Create Activity
                            </Button>
                        </Fragment>}

                    <DialogManager/>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Header;
