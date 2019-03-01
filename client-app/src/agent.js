import axios from 'axios';
import commonStore from './Common/commonStore';
import authStore from './Components/Auth/authStore';

axios.defaults.baseURL = 'https://localhost:5001/api';
axios.defaults.headers.common["Authorization"] = `Bearer ${commonStore.token}`;

axios.interceptors.response.use(undefined, (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry && commonStore.refreshToken) {
        console.log('401 returned from server... attempting to refresh the token');
        originalRequest._retry = true;
        
        const payload = {
                refreshToken: commonStore.refreshToken,
                token: commonStore.token
        };
        
        return axios
            .post('/users/refresh', payload)
            .then(response => {
                const auth = response.data;
                axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
                originalRequest.headers["Authorization"] = `Bearer ${auth.token}`;
                commonStore.setToken(auth.token, auth.refreshToken);
                console.log('token refreshed');
                return axios(originalRequest);
            })
            .catch(error => {
                console.log('refresh failed.. logging out the user');
                authStore.logout();
                delete axios.defaults.headers.common["Authorization"];
                return Promise.reject(error)
            })
    }
    return Promise.reject(error);
});

// const handleErrors = err => {
//     if (err && err.response && err.response.status === 401) {
//         authStore.logout();
//     }
//     return err;
// };

const responseBody = res => {
    return res.data;
};

const sleep = (ms) => (x) => new Promise(resolve => setTimeout(() => resolve(x), ms));

const requests = {
    get: url =>
        axios.get(url)
            .then(sleep(1000))
            .then(responseBody),
            // .catch(handleErrors),
    post: (url, body) =>
        axios.post(url, body)
            .then(sleep(1000))
            .then(responseBody),
            // .catch(handleErrors),
    put: (url, body) =>
        axios.put(url, body)
            .then(sleep(1000))
            .then(responseBody),
            // .catch(handleErrors),
    del: url =>
        axios.delete(url)
            .then(sleep(1000))
            .then(responseBody),
            // .catch(handleErrors)
    form: (url, file) => {
        let formData = new FormData();
        formData.append('File', file);
        console.log('>> formData >>', formData);
        return axios.post(url, formData, {headers: {'Content-type': 'multipart/form-data'}})
            .then(sleep(1000))
            .then(responseBody)
    }
};

const Auth = {
    current: () =>
        requests.get('/user'),
    login: (email, password) =>
        requests.post('/users/login', {email, password}),
    register: (username, email, password) =>
        requests.post('/users', {username, email, password}),
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

const limit = (count, p) => {
    p--;
    return (
        `limit=${count}&offset=${p ? p * count : 0}`
    )
};


const Activities = {
    all: (page, lim) =>
        requests.get(`/activities?${limit(lim, page)}`),
    byHost: (host, page, lim) =>
        requests.get(`/activities?host=${host}&${limit(lim, page)}`),
    byUserGoing: (going, page, lim) =>
        requests.get(`/activities?going=${going}&${limit(lim, page)}`),
    byStartDate: (startDate, page, lim) =>
        requests.get(`/activities?startDate=${startDate}&${limit(lim, page)}`),
    byUsername: (username, page, lim) =>
        requests.get(`/activities?username=${username}&${limit(lim, page)}`),
    get: id =>
        requests.get(`/activities/${id}`),
    create: activity =>
        requests.post('/activities', activity),
    update: activity =>
        requests.put(`/activities/${activity.id}`, activity),
    attend: activity =>
        requests.post(`/activities/${activity.id}/attend`, {}),
    cancelAttendance: activity =>
        requests.del(`/activities/${activity.id}/attend`)
};

const User = {
    addPhoto: (photo) =>
        requests.form(`/photos`, photo),
    deletePhoto: (photo) =>
        requests.del(`/photos/${photo.id}`),
    setMainPhoto: (photo) =>
        requests.post(`/photos/${photo.id}`),
    updateUser: (user) =>
        requests.put(`/user`, user),
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

const Profiles = {
    get: (username) => 
        requests.get(`profiles/${username}`),
    follow: (username) =>
        requests.post(`/profiles/${username}/follow`),
    unfollow: (username) =>
        requests.del(`/profiles/${username}/follow`),
    list: (username, type) =>
        requests.get(`profiles/${username}/${type}`)
};

export default {
    Auth,
    Activities,
    User,
    Comments,
    Profiles
}