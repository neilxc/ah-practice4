import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import activityStore from './Components/Activities/activityStore';
import {Provider} from 'mobx-react';
import commonStore from "./Common/commonStore";
import userStore from "./Components/Users/userStore";
import authStore from "./Components/Auth/authStore";
import dialogStore from "./Components/Dialogs/dialogStore";

const stores = {
    activityStore,
    commonStore,
    userStore,
    authStore,
    dialogStore
};

ReactDOM.render(
    <Provider {...stores}>
        <App />
    </Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
