import authStore from "../../../Components/Auth/authStore";
import modalStore from "../../../Common/modals/modalStore";

const fields = {
    fields: {
        username: {
            label: 'Username',
            placeholder: 'Enter your desired Username',
            rules: 'required|string'
        },
        email: {
            label: 'Email',
            placeholder: 'Email Address',
            rules: 'required|email|between:5,25|checkEmail'
        },
        password: {
            label: 'Password',
            placeholder: 'Password',
            rules: 'required|string|between:4,8'
        }
    }
};

const hooks = {
    hooks: {
        onSuccess(form) {
            authStore.register(form.values())
                .then(() => modalStore.closeModal())
        },
        onError(form) {
            console.log('All form errors', form.errors());
        }
    }
};

export default {
    fields,
    hooks,
}