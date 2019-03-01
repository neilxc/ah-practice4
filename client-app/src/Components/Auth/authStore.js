import {observable, action} from "mobx";
import agent from '../../agent';
import commonStore from '../../Common/commonStore';
import modalStore from "../../Common/modals/modalStore";
import {routingStore} from '../../index';

class AuthStore {
    @observable inProgress = false;
    @observable errors = undefined;
    @observable currentUser = null;
    @observable username = 'blob';
    @observable loadingUser;
    @observable forgotPasswordTokenSent = false;
    @observable passwordUpdatedSuccess = false;

    @action login = async (values) => {
        try {
            this.inProgress = true;
            const user = await agent.Auth.login(values.email, values.password);
            commonStore.setToken(user.token, user.refreshToken);
            await this.getUser();
            this.inProgress = false;
            modalStore.closeModal();
            routingStore.history.push('/activities')
        } catch (err) {
            this.errors = err.response && err.response.body && err.response.body.errors;
            this.inProgress = false;
            throw err;
        }
    };
    
    @action externalLogin = async (providerResponse) => {
        try {
            const user = await agent.Auth.externalLogin(providerResponse);
            commonStore.setToken(user.token, user.refreshToken);
            await this.getUser();
        } catch (err) {
            console.log(err)
        }
    };

    @action register = async (values) => {
        try {
            await agent.Auth.register(values.username, values.email, values.password);
            await this.getUser();
            modalStore.closeModal();
        } catch (err) {
            this.errors = err.response && err.response.body && err.response.body.errors;
            throw err;
        }
    };

    // @action refresh = async () => {
    //     try {
    //         const user = await agent.Auth.refresh(commonStore.token, commonStore.refreshToken);
    //         console.log({user});
    //         commonStore.setToken(user.token, user.refreshToken);
    //         await this.getUser();
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    @action logout = () => {
        commonStore.setToken(undefined, undefined);
        this.currentUser = null;
        routingStore.history.push('/')
    };

    @action getUser = async () => {
        try {
            const user = await agent.Auth.current();
            this.currentUser = user;
            this.username = user.username;
        } catch (err) {
            console.log(err);
        }
    };

    @action forgetUser() {
        this.currentUser = undefined;
    }

    @action setMainPhoto = (photo) => {
        this.currentUser.image = photo.url;
    };
    
    @action handleForgotPassword = async (email) => {
        console.log(email);
        const returnUrl = 'http://localhost:3000/changePassword';
        try {
            let result = await agent.Auth.forgotPassword(email, returnUrl);
            this.forgotPasswordTokenSent = true;
            return result;
        } catch (err) {
            console.log(err);
        }
    };
    
    @action resetPassword = async ({email, password, code}) => {
        try {
            let result = await agent.Auth.resetPassword(email, password, code);
            this.passwordUpdatedSuccess = false;
            return result;
        } catch (err) {
            console.log(err);
        }
    };
    
    @action changePassword = async ({currentPassword, newPassword}) => {
        try {
            let result = await agent.Auth.changePassword(currentPassword, newPassword);
            this.passwordUpdatedSuccess = true;
            return result;
        } catch (err) {
            console.log(err);
        }
    };
    
    // isTokenExpired() {
    //     const refreshThreshold = toDate(new Date().getTime());
    //     const tokenExpiry = toDate(commonStore.tokenExpiry * 1000);
    //     console.log(refreshThreshold > tokenExpiry);
    //     return refreshThreshold > tokenExpiry;
    // }

}

export default new AuthStore();