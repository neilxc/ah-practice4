import {observable, action} from "mobx";
import agent from '../../agent';
import commonStore from '../../Common/commonStore';

class AuthStore {
    @observable inProgress = false;
    @observable errors = undefined;
    @observable currentUser;
    
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
            .then((user) => this.currentUser = user)
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(() => {this.inProgress = false}))
    };
}

export default new AuthStore();