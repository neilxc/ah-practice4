import { categoryOptions } from '../data/options';
import activityStore from "../../../Components/Activities/activityStore";
import {combineDateAndTime} from "../../utils";

const fields = {
    fields: [
        'title',
        'description',
        'category',
        'date',
        'time',
        'city',
        'venue'
    ],
    placeholders: {
        title: 'Activity Title',
        description: 'Description',
        category: 'Activity Category',
        date: 'Activity Date',
        time: 'Time of activity',
        city: 'City',
        venue: 'Venue'
    },
    rules: {
        title: 'required|string',
        description: 'required|string',
        category: 'required',
        date: 'required',
        time: 'required',
        city: 'required',
        venue: 'required'
    },
    extra: {
        category: categoryOptions,
    }
};

const hooks = {
    hooks: {
        async onSuccess(form) {
            const dateAndTime = combineDateAndTime(form.$('date').value, form.$('time').value);
            const {date, time, ...updatedActivity} = form.values();
            console.log({...updatedActivity, date: dateAndTime});
            if (form.has('id')) {
                console.log('updated activity hook');
                await activityStore.updateActivity({...updatedActivity, date: dateAndTime});
                return form;
            } else {
                console.log('create new activity hook');
                const newActivity = await activityStore.addActivity({...updatedActivity, date: dateAndTime});
                form.add({key: 'id', value: newActivity.id});
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