import MobxReactForm from "mobx-react-form";
import activityStore from '../../../Components/Activities/activityStore';

const categories = [
    { key: 'drinks', text: 'Drinks', value: 'drinks' },
    { key: 'culture', text: 'Culture', value: 'culture' },
    { key: 'film', text: 'Film', value: 'film' },
    { key: 'food', text: 'Food', value: 'food' },
    { key: 'music', text: 'Music', value: 'music' },
    { key: 'travel', text: 'Travel', value: 'travel' }
];

// const flds = ['title', 'description', 'category', 'date', 'city', 'venue'];

export default {
    fields: {
        title: {
            label: 'Title',
            placeholder: 'Activity Title',
            rules: 'required|string'
        },
        description: {
            label: 'Description',
            placeholder: 'Please enter a description of the activity',
            rules: 'required|string'
        },
        category: {
            label: 'Category',
            placeholder: 'Please choose the activity category',
            rules: 'required',
            extra: categories
        },
        date: {
            label: 'Date',
            placeholder: 'Please enter the activity date',
            rules: 'required',
            extra: {
                showDateTime: true,
                dateFormat: "YYYY-MM-DD HH:mm",
                timeFormat: "HH:mm",
                showTimeSelect: true
            }
        },
        city: {
            label: 'City',
            placeholder: 'City',
            rules: 'required'
        },
        venue: {
            label: 'Venue',
            placeholder: 'Venue',
            rules: 'required'
        }
    },
    hooks: {
        onSuccess(form) {
            if (form.has('id')) {
                console.log('about to update activity - im in the hook');
                return activityStore.updateActivity(form.values())
                    .then(() => console.log('activity updated'));
            } else {
                console.log('adding activity inside mobx form hook');
                return activityStore.addActivity(form.values())
                    .then(() => console.log('Activity Added (mobxform complete)'));
            }
        },
        onError(form) {
            alert('Form has errors!');
            // get all form errors
            console.log('All form errors', form.errors());
        }
    }
};

// const hooks = {
//     onSuccess(form) {
//         if (form.has('id')) {
//             console.log('about to update activity - im in the hook');
//             return activityStore.updateActivity(form.values())
//                 .then(() => console.log('activity updated'));
//         } else {
//             console.log('adding activity inside mobx form hook');
//             return activityStore.addActivity(form.values())
//                 .then(() => console.log('Activity Added (mobxform complete)'));
//         }
//     },
//     onError(form) {
//         alert('Form has errors!');
//         // get all form errors
//         console.log('All form errors', form.errors());
//     }
// };
//
// export default {
//     fields,
//     hooks
// }