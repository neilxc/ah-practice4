import React, {Component, Fragment} from 'react';
import {inject, observer} from 'mobx-react';
import {toast} from "react-toastify";
import {withRouter} from "react-router-dom";
import { Redirect } from "react-router-dom";

export const Protected = (Children) => {
    @withRouter 
    @inject('authStore')
    @observer
    class AuthenticatedComponent extends Component {
        renderRedirect = () => {
            toast.error('Please login or register to access this app');
            return (<Redirect to={{pathname: "/"}}/>)
        };
        
        render() {
            const authenticated = !!this.props.authStore.currentUser;
            return (
                <Fragment>
                    {authenticated
                        ? <Children {...this.props} />
                        : this.renderRedirect()
                    }
                </Fragment>
            )
        }
    }
    return AuthenticatedComponent;
};