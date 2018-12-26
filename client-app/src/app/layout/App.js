import 'semantic-ui-css/semantic.min.css';
import React, { Component, Fragment } from 'react';
import './App.css';
import {Route, Switch, withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {Container} from "semantic-ui-react";
import NavMenu from "../../features/nav/NavMenu";
import Home from "../../features/home/Home";
import ActivityDashboard from "../../features/activity/ActivityDashboard/ActivityDashboard";
import ActivityDetailedPage from "../../features/activity/ActivityDetailed/ActivityDetailedPage";
import Login from "../../features/auth/Login";
import Register from "../../features/auth/Register";

@withRouter
@inject('commonStore', 'userStore')
@observer
class App extends Component {
  componentWillMount() {
    if (!this.props.commonStore.token) {
      this.props.commonStore.setAppLoaded();
    }
  }

  componentDidMount() {
    if (this.props.commonStore.token) {
      this.props.userStore.pullUser().finally(() => this.props.commonStore.setAppLoaded());
    }
  }

  render() {
    return (
        <Fragment>
          <Switch>
            <Route exact path='/' component={Home}/>
          </Switch>
          <Route path='/(.+)' render={() => (
              <Fragment>
                <NavMenu/>
                <Container className="main">
                  <Route exact path='/activities' component={ActivityDashboard}/>
                  <Route path='/activities/:id' component={ActivityDetailedPage}/>
                  {/*<Route path='/manage/:id' component={EventForm}/>*/}
                  {/*<Route path='/createEvent' component={EventForm}/>*/}
                  {/*<Route path='/counter' component={Counter}/>*/}
                  {/*<Route path='/fetchdata' component={FetchData}/>*/}
                  <Route path='/login' component={Login}/>
                  <Route path='/register' component={Register}/>
                </Container>
              </Fragment>
          )}/>
        </Fragment>
    );
  }
}

export default App;
