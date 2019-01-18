import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import commonStore from './Common/commonStore';

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
        req.set('Authorization', `Bearer ${commonStore.token}`);
    }
};

const requests = {
    get: url =>
        superagent
            .get(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    post: (url, body) =>
        superagent
            .post(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    put: (url, body) =>
        superagent
            .post(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    del: url =>
        superagent
            .get(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
};

const Auth = {
    current: () =>
        requests.get('/user'),
    login: (email, password) =>
        requests.post('/users/login', {user: {email, password}}),
    register: (username, email, password) =>
        requests.post('/users/register', {user: {username, email, password}})
};

export default {
    Auth
}