import activityStore from "../../../Components/Activities/activityStore";
import {toast} from "react-toastify";

const fields = {
    fields: [
        'body'
    ],
    placeholders: {
        body: 'Comment on this activity'
    },
};

const hooks = {
    hooks: {
        onSuccess(form) {
            console.log('inside chat success');
            return activityStore.addComment(form.values())
                .then(() => form.clear());
        },
        onError(form) {
            console.log('at least have hit the error');
            toast.error('Problem sending comment');
            // get all form errors
            return form;
        }
    }
};

export default {
    fields,
    hooks
}