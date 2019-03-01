import React, {Component, Fragment} from 'react';
import {Header} from './Layouts';
import {Route, Switch, withRouter} from 'react-router-dom';
import Activities from './Components/Activities/Activities';
import {inject, observer} from "mobx-react";
import Details from "./Components/Activities/Detailed/Details";
import ActivityForm from "./Components/Activities/ActivityForm";
import Home from "./Components/Home/Home";
import {Container} from "semantic-ui-react";
import DevTools from 'mobx-react-devtools';
// import form from "./Components/Activities/createActivityFormSetup";
import forms from './Common/form/forms';
import SettingsDashboard from "./Components/Settings/SettingsDashboard";
import ForgotPassword from "./Components/Settings/ForgotPassword";
import ChangePassword from "./Components/Settings/ChangePassword";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import MobxReactFormDevTools from "mobx-react-form-devtools";
import ModalContainer from "./Common/modals/ModalContainer";
import LoadingComponent from "./Layouts/LoadingComponent";
import UserDetailedPage from "./Components/Users/Detailed/UserDetailed";

MobxReactFormDevTools.register(forms);

@withRouter
@inject('commonStore', 'authStore')
@observer    
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
        if (!this.props.commonStore.appLoaded) return <LoadingComponent content={'Loading app...'}/>;
        return (
            <Fragment>
                <ToastContainer position={'bottom-right'}/>
                <DevTools />
                <MobxReactFormDevTools.UI />
                <ModalContainer/>
                <Switch>
                    <Route exact path={'/'} component={Home}/>
                </Switch>
                <Route path={"/(.+)"} render={() => (
                    <Fragment>
                        <Header/>
                        <Container className={'main'}>
                            <Switch key={this.props.location.key}>
                                <Route exact path={'/activities'} component={Activities}/>
                                <Route path={'/activities/:id'} component={Details}/>
                                <Route exact path={'/profile/:id'} component={UserDetailedPage}/>
                                <Route exact path={'/manage/:id'} render={() => <ActivityForm form={forms.activityForm} key={'existing'} />}/>
                                <Route exact path={'/createActivity'} render={() => <ActivityForm form={forms.activityForm} key={'new'} />}/>
                                <Route path={'/settings'} component={SettingsDashboard}/>
                                <Route path={'/forgotPassword'} component={ForgotPassword}/>
                                <Route path={'/changePassword'} component={ChangePassword}/>
                            </Switch>
                        </Container>
                    </Fragment>
                )}/>

            </Fragment>

        );
    }
}

export default App;
