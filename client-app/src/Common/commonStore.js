import {observable, reaction, action, computed} from "mobx";
import jwtDecode from 'jwt-decode';

class CommonStore {
    @observable appName = "Activity Hub";
    @observable token = window.localStorage.getItem('jwt');
    @observable refreshToken = window.localStorage.getItem('refreshToken');
    @observable appLoaded = false;
    @observable asyncLoading = 0;
    
    constructor() {
        reaction(
            () => this.token,
            token => {
                console.log('inside reaction');
                if (token) {
                    console.log('token reaction');
                    // console.log(this.tokenExpiry);
                    window.localStorage.setItem('jwt', token);
                } else {
                    console.log('no token');
                    window.localStorage.removeItem('jwt');
                }
            }
        );
        reaction(
            () => this.refreshToken,
            refreshToken => {
                if (refreshToken) {
                    console.log('refresh token reaction');
                    window.localStorage.setItem('refreshToken', refreshToken);
                } else {
                    window.localStorage.removeItem('refreshToken')
                }
            }
        )
    }
    
    @computed get tokenExpiry() {
        return jwtDecode(this.token).exp;
    }
    
    @action setToken(token, refreshToken) {
        console.log('setting token');
        this.token = token;
        this.refreshToken = refreshToken;
        // this.tokenExpiry = jwtDecode(token).exp;
    }
    
    @action setAppLoaded() {
        console.log('app is loaded');
        this.appLoaded = true;
    }
}

export default new CommonStore();