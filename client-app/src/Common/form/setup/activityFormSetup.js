import { categoryOptions } from '../data/options';
import activityStore from "../../../Components/Activities/activityStore";

const fields = {
    fields: [
        'title',
        'description',
        'category',
        'date',
        'city',
        'venue'
    ],
    placeholders: {
        title: 'Activity Title',
        description: 'Description',
        category: 'Activity Category',
        date: 'Activity Date',
        city: 'City',
        venue: 'Venue'
    },
    rules: {
        title: 'required|string',
        description: 'required|string',
        category: 'required',
        date: 'required',
        city: 'required',
        venue: 'required'
    },
    extra: {
        date: {
            showDateTime: true,
            dateFormat: "YYYY-MM-DD HH:mm",
            timeFormat: "HH:mm",
            showTimeSelect: true
        },
        category: categoryOptions,
    }
};
// handleSubmit = async () => {

const hooks = {
    hooks: {
        async onSuccess(form) {
            if (form.has('id')) {
                console.log('im in the update activity hoook...0');
                const updatedActivity = await activityStore.updateActivity(form.values());
                console.log(updatedActivity);
                return form;
            } else {
                console.log('adding activity inside mobx form hook');
                const newActivity = await activityStore.addActivity(form.values());
                console.log(newActivity);
                form.add({key: 'id', value: newActivity.id});
                console.log({form});
                return form;
            }
        },
        onError(form) {
            console.log('All form errors', form.errors());
            return form.errors();
        }
    },
};

export default {
    fields,
    hooks
}