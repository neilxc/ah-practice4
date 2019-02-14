import validatorjs from "validatorjs";
import MobxReactForm from "mobx-react-form";
import authStore from "./authStore";
import modalStore from "../../Common/modals/modalStore";

const plugins = {dvr: validatorjs};

const fields = {
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
};

const hooks = {
    onSuccess(form) {
        authStore.login(form.values());
        modalStore.closeModal();
    },
    onError(form) {
        alert('Form has errors!');
        // get all form errors
        console.log('All form errors', form.errors());
    }
};

export default new MobxReactForm({fields}, {plugins, hooks});