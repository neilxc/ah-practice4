import {observable, reaction, action} from "mobx";

class CommonStore {
    @observable appName = "Activity Hub";
    @observable token = window.localStorage.getItem('jwt');
    @observable appLoaded = false;
    
    constructor() {
        reaction(
            () => this.token,
            token => {
                if (token) {
                    console.log('there is a token');
                    window.localStorage.setItem('jwt', token);
                } else {
                    console.log('no token');
                    window.localStorage.removeItem('jwt');
                }
            }
        )
    }
    
    @action setToken(token) {
        console.log('setting token');
        this.token = token;
    }
    
    @action setAppLoaded() {
        console.log('app is loaded');
        this.appLoaded = true;
    }
}

export default new CommonStore();