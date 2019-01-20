import React, {Component, Fragment} from 'react';
import {Header} from './Layouts';
import Activities from './Components/Activities';
import {inject} from "mobx-react";

@inject('commonStore', 'authStore')
class App extends Component {
    componentWillMount() {
        if (!this.props.commonStore.token) {
            this.props.commonStore.setAppLoaded();
        }
    }
    
    componentDidMount() {
        if (this.props.commonStore.token) {
            this.props.authStore.getUser().finally(() => this.props.commonStore.setAppLoaded());
        }
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <Activities/>
            </Fragment>
        );
    }
}

export default App;
