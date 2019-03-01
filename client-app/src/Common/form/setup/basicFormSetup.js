import userStore from '../../../Components/Users/userStore';
import {toast} from "react-toastify";
import {genders, statuses} from "../data/options";

const fields = {
    fields: [
        'gender',
        'dateOfBirth',
        'city',
        'status',
        'bio',
        'origin'
    ],
    placeholders: {
        dateOfBirth: 'Please enter your date of birth',
        city: 'Home Town',
        bio: 'Tell us about yourself',
        origin: 'Country of origin'
    },
    extra: {
        gender: genders,
        status: statuses,
    },
    labels: {
        gender: 'Gender',
        dateOfBirth: 'Date of Birth',
        city: 'City',
        status: 'Relationship status',
        bio: 'Bio',
        occupation: 'Occupation',
        origin: 'Country of Origin'
    }
};

const hooks = {
    hooks: {
        onSuccess(form) {
            console.log(form.values());
            userStore.updateUser(form.values())
                .then(() => form.init(form.values()))
                .then(() => toast.success('Updated User!', ))
        },
        onError(form) {
            toast.error('Form has errors!');
            // get all form errors
            console.log('All form errors', form.errors());
        }
    }
};

export default {
    fields,
    hooks
}