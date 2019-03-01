import agent from '../../../agent';

const asyncRules = {
    checkEmail: (value, attr, key, passes) => {
        const msg = `The email address ${value} is already in use... please login instead with that email`;
        agent.User.checkEmail(value)
            .then((result) => (result === false) ? passes() : passes(false, msg));
    }
};

// const rules = {
//     telephone: {
//         function: value => value.match(/^\d{3}-\d{3}-\d{4}$/),
//         message: 'The :attribute phone number is not in the format XXX-XXX-XXXX.',
//     },
// };

export default ($validator) => {
    // register async rules
    Object.keys(asyncRules).forEach(key =>
        $validator.registerAsyncRule(key, asyncRules[key]));
};