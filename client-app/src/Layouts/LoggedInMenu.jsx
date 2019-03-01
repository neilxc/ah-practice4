import React, {Component} from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import {inject, observer} from "mobx-react";

@inject('authStore')
@observer
class LoggedInMenu extends Component{
    render() {
        const {logout, authStore: {currentUser}} = this.props;
        return (
            <Menu.Item position="right">
                <Image avatar spaced="right" src={currentUser.image || "/assets/user.png"} />
                <Dropdown pointing="top left" text={currentUser.username}>
                    <Dropdown.Menu>
                        <Dropdown.Item text="Create Event" icon="plus" />
                        <Dropdown.Item text="My Events" icon="calendar" />
                        <Dropdown.Item text="My Network" icon="users" />
                        <Dropdown.Item as={Link} to={`/profile/${currentUser.username}`} text="My Profile" icon="user" />
                        <Dropdown.Item as={Link} to='/settings' text="Settings" icon="settings" />
                        <Dropdown.Item onClick={logout} text="Sign Out" icon="power" />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        );
    }
}

export default LoggedInMenu;