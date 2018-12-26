import React, {Component} from 'react';
import {Button, Container, Menu} from "semantic-ui-react";
import {Link, NavLink, withRouter} from "react-router-dom";
import SignedOut from "./SignedOut";
import SignedIn from "./SignedIn";
import {inject, observer} from "mobx-react";

@withRouter
@inject('userStore', 'commonStore', 'authStore')
@observer
class NavMenu extends Component {

    handleLogout = () => {
        this.props.authStore.logout();
        this.props.history.push('/');
    };

    render() {
        const isLoggedIn = !!this.props.userStore.currentUser;
        const {currentUser} = this.props.userStore;
        return (
            <Menu inverted fixed="top">
                <Container>
                    <Menu.Item header as={Link} to={'/'}>
                        <img src="/assets/logo.png" alt="logo"/>
                        Re-vents
                    </Menu.Item>
                    <Menu.Item as={NavLink} to={'/activities'} name="Activities"/>
                    {isLoggedIn &&
                    <Menu.Item>
                        <Button as={Link} to={'/createEvent'} floated="right" positive inverted content="Create Event"/>
                    </Menu.Item>}
                    {!isLoggedIn &&
                    <SignedOut/>}
                    {isLoggedIn &&
                    <SignedIn logout={this.handleLogout} currentUser={currentUser}/>}
                </Container>
            </Menu>
        );
    }
}

export default NavMenu;