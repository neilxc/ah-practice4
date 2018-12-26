import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import commonStore from "./app/common/commonStore";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://ah-api.azurewebsites.net/api';

const handleErrors = err => {
    if (err && err.response && err.response.status === 401){
        // logout
    }
    return err;
};

const responseBody = res => res.body;

const tokenPlugin = req => {
    if (commonStore.token) {
        req.set('authorization', `Bearer ${commonStore.token}`)
    }
};

const requests = {
    del: url =>
        superagent
            .del(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    get: url =>
        superagent
            .get(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    put: (url, body) =>
        superagent
            .put(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    post: (url, body) =>
        superagent
            .post(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody)
};

const Auth = {
    current: () =>
        requests.get('/user'),
    login: (email, password) =>
        requests.post('/users/login', {user: {email, password}}),
    register: (username, email, password) =>
        requests.post('/users', {user: {username, email, password}})
};

const Activities = {
    all: () =>
        requests.get(`/activities`),
    get: id =>
        requests.get(`/activities/${id}`),
    create: evt =>
        requests.post('/activities', {evt}),
    update: evt =>
        requests.put(`/activities/${evt.id}`, {evt})
};

export default {
    Auth,
    Activities
}