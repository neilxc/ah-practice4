import {observable, action} from "mobx";
import agent from '../../agent';
import commonStore from '../../Common/commonStore';
import dialogStore from "../Dialogs/dialogStore";

class AuthStore {
    @observable inProgress = false;
    @observable errors = undefined;
    @observable currentUser = null;
    @observable loadingUser;

    @observable values = {
        username: '',
        email: '',
        password: ''
    };

    @action setUsername(username) {
        this.values.username = username;
    }

    @action setEmail(email) {
        this.values.email = email;
    }

    @action setPassword(password) {
        this.values.password = password;
    }

    @action reset() {
        this.values.username = '';
        this.values.email = '';
        this.values.password = '';
    }

    @action login = () => {
        this.inProgress = true;
        return agent.Auth.login(this.values.email, this.values.password)
            .then((user) => commonStore.setToken(user.token))
            .then(action(() => this.getUser()))
            .then(() => dialogStore.closeDialog())
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(() => {
                this.inProgress = false
            }))
    };

    @action logout = () => {
        console.log(!!this.currentUser);
        console.log('logout fired');
        commonStore.setToken(undefined);
        this.currentUser = null;
    };
    
    @action getUser = () => {
      this.loadingUser = true;
      return agent.Auth.current()
          .then(action((user) => {this.currentUser = user}))
          .finally(action(() => {this.loadingUser = false}))
    };
    
    @action forgetUser() {
        this.currentUser = undefined;
    }
}

export default new AuthStore();