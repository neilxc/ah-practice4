import React, {Component} from 'react';
import {List, ListItem} from "@material-ui/core";

class RightMenu extends Component {
    render() {
        return (
            <List>
                <ListItem button>
                    All Activities
                </ListItem>
            </List>
        )
    }
}