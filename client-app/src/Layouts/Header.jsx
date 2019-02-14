import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link, NavLink} from "react-router-dom";
import {Container, Menu, Button} from "semantic-ui-react";
import LoggedInMenu from "./LoggedInMenu";
import LoggedOutMenu from "./LoggedOutMenu";

@inject('modalStore', 'authStore', 'activityStore')
@observer
class Header extends Component {
   
    render() {
        const isLoggedIn = !!this.props.authStore.currentUser;
        const {openModal} = this.props.modalStore;
        const {logout, currentUser} = this.props.authStore;
        return (
            <Menu inverted fixed={'top'}>
                <Container>
                    <Menu.Item as={Link} to={'/'} header>
                        <img src="/assets/logo.png" alt="logo" />
                        Re-vents
                    </Menu.Item>
                    <Menu.Item>
                        <Button
                            as={Link} 
                            to={'/createActivity'} 
                            floated={'right'} 
                            positive 
                            inverted 
                            content={'Create Activity'}/>
                    </Menu.Item>
                    {isLoggedIn &&
                    <LoggedInMenu
                        currentUser={currentUser}
                        logout={logout}
                    />}
                    {!isLoggedIn &&
                    <LoggedOutMenu 
                        openModal={openModal}
                    />}
                </Container>
            </Menu>
        )
    }
}

export default Header;
