import {observable, action} from "mobx";
import agent from "../../agent";
import commonStore from "../../app/common/commonStore";
import userStore from "../../features/users/userStore";

class AuthStore {
    @observable inProgress = false;
    @observable errors = undefined;

    @observable values = {
        userName: '',
        email:'',
        password: ''
    };

    @action setLastName(userName) {
        this.values.userName = userName;
    }

    @action setEmail(email) {
        this.values.email = email;
    }

    @action setPassword(password) {
        this.values.password = password
    }

    @action reset() {
        this.values.userName = '';
        this.values.email = '';
        this.values.password = '';
    }

    @action login(values) {
        this.inProgress = true;
        this.errors = undefined;
        return agent.Auth.login(values.email, values.password)
            .then((user) => commonStore.setToken(user.token))
            .then(() => userStore.pullUser())
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(() => {this.inProgress = false}))
    }

    @action register(values) {
        this.inProgress = true;
        this.errors = undefined;
        return agent.Auth.register(values.userName, values.email, values.password)
            .then(({user}) => commonStore.setToken(user.token))
            .then(() => userStore.pullUser())
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(() => {this.inProgress = false}))
    }

    @action logout() {
        commonStore.setToken(undefined);
        userStore.forgetUser();
        return Promise.resolve();
    }

}

export default new AuthStore();