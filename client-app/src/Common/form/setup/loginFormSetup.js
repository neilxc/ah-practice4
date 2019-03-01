import authStore from "../../../Components/Auth/authStore";
import modalStore from "../../modals/modalStore";

const fields = {
    fields: {
        email: {
            label: 'Email',
            placeholder: 'Email Address',
            rules: 'required|email|between:5,25'
        },
        password: {
            label: 'Password',
            placeholder: 'Password',
            rules: 'required|string|between:4,10'
        }
    }
};

const hooks = {
    hooks: {
        onSuccess(form) {
            authStore.login(form.values())
                .then(() => modalStore.closeModal());
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