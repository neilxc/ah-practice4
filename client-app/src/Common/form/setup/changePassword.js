import authStore from "../../../Components/Auth/authStore";

const fields = {
    fields: [
        'currentPassword',
        'newPassword',
        'confirmNewPassword'
    ],
    placeholders: {
        currentPassword: 'Please enter your current password',
        newPassword: 'Please enter your new password',
        confirmNewPassword: 'Please confirm your new password'
    },
    types: {
        currentPassword: 'password',
        newPassword: 'password',
        confirmNewPassword: 'password'
    },
    rules: {
        currentPassword: 'required',
        newPassword: 'required|different:currentPassword',
        confirmNewPassword: 'same:newPassword'
    }
};

const hooks = {
    hooks: {
        onSuccess(form) {
            authStore.changePassword({currentPassword: form.values().currentPassword, newPassword: form.values().newPassword})
                .then(() => {
                    form.clear();
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
