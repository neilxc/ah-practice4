import validatorjs from "validatorjs";
import MobxReactForm from "mobx-react-form";

const plugins = {dvr: validatorjs};

const fields = [
    {
        name: 'status',
        type: 'radio',
    },
    {
        name: 'bio',
        label: 'Bio',
        placeholder: 'Bio'
    },
    {
        name: 'city',
        label: 'Home Town',
        placeholder: 'Home town'
    },
    {
        name: 'occupation',
        label: 'Occupation',
        placeholder: 'Occupation'
    },
    {
        name: 'origin',
        label: 'Country of origin',
        placeholder: 'Country of origin'
    }
];

const hooks = {
    onSuccess(form) {
        console.log(form.values())
    },
    onError(form) {
        alert('Form has errors!');
        // get all form errors
        console.log('All form errors', form.errors());
    }
};

export default new MobxReactForm({fields}, {plugins, hooks});