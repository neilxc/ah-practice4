import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import './index.css';
import App from './app/layout/App';
import authStore from './features/auth/authStore';
import commonStore from './app/common/commonStore';
import userStore from './features/users/userStore';
import activityStore from './features/activity/activityStore';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";

// const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const stores = {
    authStore,
    commonStore,
    userStore,
    activityStore
};

ReactDOM.render(
    <Provider {...stores}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    ,rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();