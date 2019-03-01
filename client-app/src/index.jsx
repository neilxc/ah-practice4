import React from 'react';
import ReactDOM from 'react-dom';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import App from './App';
import * as serviceWorker from './serviceWorker';
import activityStore from './Components/Activities/activityStore';
import 'semantic-ui-css/semantic.min.css';
import './styles.css';
import {Provider} from 'mobx-react';
import {Router} from "react-router-dom";
import commonStore from "./Common/commonStore";
import userStore from "./Components/Users/userStore";
import authStore from "./Components/Auth/authStore";
import modalStore from "./Common/modals/modalStore";
import dateFnsLocalizer from 'react-widgets-date-fns';
import 'react-widgets/dist/css/react-widgets.css';

dateFnsLocalizer();

const browserHistory = createBrowserHistory();
export const routingStore = new RouterStore();

const stores = {
    activityStore,
    commonStore,
    userStore,
    authStore,
    modalStore,
    routingStore
};

const history = syncHistoryWithStore(browserHistory, routingStore);

ReactDOM.render(
    <Provider {...stores}>
        <Router history={history}>
            <App /> 
        </Router>
    </Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
