import data from '../../activities.json';
import {observable, action, computed} from "mobx";
import * as Utils from '../../Common/utils';

const attendee = {
    username: "testuser",
    dateJoined: new Date(),
    image: null,
    isHost: false
};

class ActivityStore {
    @observable activityRegistry = observable(new Map());
    @observable activity = null;
    @observable editMode = false;
    @observable dialogOpen = false;
    @observable categories = [
        'drinks', 'food', 'music', 'culture', 'travel'
    ];

    @computed get activities() {
        return Array.from(this.activityRegistry.values());
    }

    @computed get activitiesByDateFromStore() {
        return this.getActivitiesByDate(Array.from(this.activityRegistry.values()));
    }

    @action loadActivities() {
        data.activities.forEach(activity => {
            this.activityRegistry.set(activity.id, activity);
        })
    }

    @action addActivity = (activity) => {
        activity.id = Utils.uuid();
        this.activityRegistry.set(activity.id, activity);
        this.dialogOpen = false;
    };

    @action selectActivity = (id) => {
        this.activity = this.getActivity(id);
    };

    @action attendActivity = (activity) => {
        activity.attendees.push(attendee);
        this.activityRegistry.set(activity.id, activity);
    };

    @action cancelAttendance = (activity) => {
        const username = 'testuser';
        activity.attendees = activity.attendees.filter(a => a.username !== username);
        this.activityRegistry.set(activity.id, activity);
    };

    @action editActivity = (id) => {
        this.activity = this.activityRegistry.get(id);
        this.editMode = true;
    };

    @action cancelEditActivity = (id) => {
        if (id) this.editMode = false;
        this.dialogOpen = false;
    };

    @action updateActivity = (activity) => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.editMode = false;
    };

    @action dialogToggle = () => {
        this.activity = null;
        this.dialogOpen = !this.dialogOpen;
    };

    getActivity(id) {
        return this.activityRegistry.get(id);
    }

    getActivitiesByDate(activities) {
        const sortedActivities = activities.sort((a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime());
        return Object.entries(
            sortedActivities.reduce((activities, activity) => {
                const date = activity.date.split('T')[0];
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities
            }, {})
        );
    }
}

export default new ActivityStore();