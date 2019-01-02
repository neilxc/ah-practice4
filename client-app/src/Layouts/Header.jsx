import React from 'react';
import {AppBar, Toolbar, Typography, Button} from "@material-ui/core";
import CreateDialog from '../Components/Activities/Dialog';

const styles = {
    flex: {
        flex: 1
    }
};

export default ({onActivityCreate}) =>
    <AppBar position="static">
        <Toolbar>
            <Typography variant={'h5'} color={'inherit'} style={styles.flex}>
                Activity Hub
            </Typography>
            <Button color="inherit">Login</Button>
            <CreateDialog onCreate={onActivityCreate}/>
        </Toolbar>
    </AppBar>