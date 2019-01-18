import {observable, action} from "mobx";

class UserStore {
    @observable currentUser;
    @observable loadingUser;
    
    @action pullUser() {
        this.loadingUser = true;
        this.currentUser = {}
    }
    
    @action forgetUser() {
        this.currentUser = undefined;
    }
}

export default new UserStore();