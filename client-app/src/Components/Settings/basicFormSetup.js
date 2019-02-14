import validatorjs from "validatorjs";
import MobxReactForm from "mobx-react-form";
import userStore from '../Users/userStore';
import authStore from '../Auth/authStore';
import {toast} from "react-toastify";

const plugins = {dvr: validatorjs};

const fields = {
    gender: {
        label: 'Gender',
        placeholder: 'Gender',
    },
    dateOfBirth: {
        label: 'Date of Birth',
        placeholder: 'Date Of Birth',
        extra: {
            showTimeSelect: false
        }
    },
    city: {
        label: 'Home Town',
        placeholder: 'Home town'
    }
    
};

const hooks = {
    onSuccess(form) {
        console.log(form.values());
        userStore.updateUser(form.values())
            .then(() => toast.success('Updated User!', ))
    },
    onError(form) {
        toast.error('Form has errors!');
        // get all form errors
        console.log('All form errors', form.errors());
    }
};

export default new MobxReactForm({fields}, {plugins, hooks});