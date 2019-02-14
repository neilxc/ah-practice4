import authStore from "../../../Components/Auth/authStore";

const fields = {
    fields: [
        'email'
    ],
    placeholders: {
        email: 'Please enter your email address',
    },
    rules: {
        email: 'required|email'
    }
};

const hooks = {
    hooks: {
        onSuccess(form) {
            console.log('form sent :)');
            authStore.handleForgotPassword(form.values().email)
                .then(() => {
                    form.reset();
                })
                .catch((err) => {
                    console.log(err)
                })

        },
        onError(form) {
            alert('Form has errors!');
            // get all form errors
            console.log('All form errors', form.errors());
        }
    }
};

export default {
    fields,
    hooks
}
