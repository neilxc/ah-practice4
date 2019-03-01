import React, {Component, Fragment} from 'react';
import {inject, observer} from "mobx-react";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";

// import Background from '../../../public/assets/homepage.jpg';

@inject('modalStore', 'authStore', 'activityStore')
@observer
class Home extends Component {
    render() {
        const {history} = this.props;
        const {openModal} = this.props.modalStore;
        const {currentUser} = this.props.authStore;
        const isLoggedIn = !!this.props.authStore.currentUser;
        return (
            <div className="ui inverted vertical masthead center aligned segment">
                <div className="ui text container">
                    <h1 className="ui inverted stackable header">
                        <img
                            className="ui image massive"
                            src="/assets/logo.png"
                            alt="logo"
                        />
                        <div className="content">Re-vents</div>
                    </h1>
                    {!isLoggedIn ?
                        <Fragment>
                            <h2>Welcome to the Activity Hub</h2>
                            <h3>Sign in or Register to join in the activities</h3>
                            <div
                                onClick={() =>
                                    openModal({
                                        component: <LoginForm/>,
                                        header: 'Sign in to Activity Hub!'
                                    })}
                                className="ui huge white inverted button">
                                Login
                            </div>
                            <div 
                                onClick={() =>
                                    openModal({
                                        component: <RegisterForm/>,
                                        header: 'Register for Activity Hub!'
                                    })}
                                 className="ui huge white inverted button">
                                Register
                            </div>
                        </Fragment>
                        :
                        <Fragment>
                            <h2>Welcome back {currentUser.username}</h2>
                            <h3>Click the big button below to go to the activities!</h3>
                            <div onClick={() => history.push('/activities')} className="ui huge white inverted button">
                                Take me to the Activities!
                            </div>
                        </Fragment>
                    }
                </div>
            </div>
        )
    }
}

export default Home;