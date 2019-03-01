import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import commonStore from './Common/commonStore';
import authStore from './Components/Auth/authStore';
import {toDate} from 'date-fns';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://localhost:5001/api';

const handleErrors = err => {
    if (err && err.response && err.response.status === 401) {
        // logout
    }
    return err;
};

const responseBody = res => res.body;

const tokenPlugin = req => {
    if (commonStore.token) {
        const refreshThreshold = toDate(new Date().getTime());
        const tokenExpiry = toDate(commonStore.tokenExpiry * 1000);
        if (refreshThreshold > tokenExpiry) {
            console.log('we need to refresh the token');
            authStore.refresh()
                .then(req.set('Authorization', `Bearer ${commonStore.token}`))
        } else {
            console.log('token is valid - no need to refresh');
            req.set('Authorization', `Bearer ${commonStore.token}`);
        }

    }
};

const sleep = (ms) => (x) => new Promise(resolve => setTimeout(() => resolve(x), ms));

// function sleep(ms) {
//     return function(x) {
//         return new Promise(resolve => setTimeout(() => resolve(x), ms))
//     }
// }

const requests = {
    get: url =>
        superagent
            .get(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(sleep(1500))
            .then(responseBody),
    refresh: (url, body) =>
        superagent
            .post(`${API_ROOT}${url}`, body)
            .end(handleErrors)
            .then(responseBody),
    post: (url, body) =>
        superagent
            .post(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(sleep(1500))
            .then(responseBody),
    postForm: (url, formdata) =>
        superagent
            .post(`${API_ROOT}${url}`)
            .attach('Photo.File', formdata)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(sleep(1500))
            .then(responseBody),
    put: (url, body) =>
        superagent
            .put(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(sleep(1500))
            .then(responseBody),
    del: url =>
        superagent
            .del(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(sleep(1500))
            .then(responseBody),
};

const Auth = {
    current: () =>
        requests.get('/user'),
    login: (email, password) =>
        requests.post('/users/login', {user: {email, password}}),
    register: (username, email, password) =>
        requests.post('/users', {user: {username, email, password}}),
    refresh: (token, refreshToken) =>
        requests.refresh('/users/refresh', {tokenData: {token, refreshToken}}),
    verifyEmail: (userId, code) =>
        requests.get(`/users/verifyEmail?${userId}&${code}`),
    forgotPassword: (email, returnUrl) =>
        requests.post('/users/forgotPassword', {email, returnUrl}),
    resetPassword: (email, password, code) =>
        requests.post('/users/resetPassword', {email, password, code}),
    changePassword: (currentPassword, newPassword) =>
        requests.post('/users/changePassword', {currentPassword, newPassword}),
    externalLogin: (providerResponse) =>
        requests.post('/users/externalLogin', providerResponse)
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;

const Activities = {
    all: (page, lim = 10) =>
        requests.get(`/activities?${limit(lim, page)}`),
    byHost: (host, page) =>
        requests.get(`/activities?host=${host}&${limit(10, page)}`),
    byUserGoing: (going, page, lim = 10) =>
        requests.get(`/activities?going=${going}&${limit(lim, page)}`),
    byStartDate: (startDate, page, lim = 10) =>
        requests.get(`/activities?startDate=${startDate}&${limit(lim, page)}`),
    get: id =>
        requests.get(`/activities/${id}`),
    create: activity =>
        requests.post('/activities', activity),
    update: activity =>
        requests.put(`/activities/${activity.activity.id}`, activity),
    attend: activity =>
        requests.post(`/activities/${activity.id}/attend`, {}),
    cancelAttendance: activity =>
        requests.del(`/activities/${activity.id}/attend`)
};

const User = {
    addPhoto: (photo) =>
        requests.postForm(`/photos`, photo),
    deletePhoto: (photo) =>
        requests.del(`/photos/${photo.id}`),
    setMainPhoto: (photo) =>
        requests.post(`/photos/${photo.id}`),
    updateUser: (user) =>
        requests.put(`/user`, {user}),
    checkEmail: (email) =>
        requests.get(`/user/checkEmail?email=${email}`)
};

const Comments = {
    add: (id, body) =>
        requests.post(`/activities/${id}/comments`, {comment: body}),
    get: id =>
        requests.get(`/activities/${id}/comments`),
    delete: (activityId, commentId) =>
        requests.del(`/activities/${activityId}/comments/${commentId}`)
};

export default {
    Auth,
    Activities,
    User,
    Comments
}