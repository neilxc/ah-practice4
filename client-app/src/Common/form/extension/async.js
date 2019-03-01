import agent from '../../../agent';

const asyncRules = {
    checkEmail: (value, attr, key, passes) => {
        const msg = `The email address ${value} is already in use... please login instead with that email`;
        agent.User.checkEmail(value)
            .then((result) => (result === false) ? passes() : passes(false, msg));
    }
};