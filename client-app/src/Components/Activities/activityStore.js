import {observable, action, computed, runInAction} from "mobx";
import authStore from '../../Components/Auth/authStore';
import agent from '../../agent';

// const attendee = {
//     username: "testuser",
//     dateJoined: new Date(),
//     image: null,
//     isHost: false
// };

class ActivityStore {
    @observable isLoading = false;
    @observable isFailure = false;
    @observable isLoadingDetail = false;
    @observable activityRegistry = observable(new Map());
    @observable activity;
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
        this.isLoading = true;
        return agent.Activities.all()
            .then(action(({activities}) => {
                this.activityRegistry.clear();
                activities.forEach(activity => {
                    this.activityRegistry.set(activity.id, activity);
                })
            }))
            .finally(action(() => {this.isLoading = false}))
    }
    
    @action loadActivity(id, {acceptCached = false} = {}) {
        if (acceptCached) {
            const activity = this.getActivity(id);
            if (activity) return Promise.resolve(activity);
        }
        this.isLoading = true;
        return agent.Activities.get(id)
            .then(action(({activity}) => {
                this.activityRegistry.set(activity.id, activity);
                return activity;
            }))
            .finally(action(() => {this.isLoading = false}));
    }

    @action 
    async addActivity(activityToCreate) {
        try {
            this.isLoading = true;
            const activity = await agent.Activities.create({activity: activityToCreate});
            runInAction(() => {
                this.isLoading = false;
                this.activityRegistry.set(activity.id, activity);
            })
        } catch (e) {
            this.isLoading = false;
            this.isFailure = true;
            console.log(e);
        }
    };

    @action 
    async updateActivity(activityToUpdate) {
        try {
            this.isLoading = true;
            const activity = await agent.Activities.update({activity: activityToUpdate});
            runInAction(() => {
                this.isLoading = false;
                this.activityRegistry.set(activity.id, activity);
                this.activity = this.getActivity(activity.id);
                this.editMode = false;
            })
        } catch (e) {
            this.isLoading = false;
            this.isFailure = true;
            console.log(e);
        }
    };

    @action selectActivity = (id) => {
        this.activity = this.getActivity(id);
    };
    
    @action clearActivity() {
        this.activity = null;
    }

    @action.bound 
    async attendActivity(activityToAttend) {
        try {
            this.isLoading = true;
            const activity = await agent.Activities.attend(activityToAttend);
            runInAction(() => {
                this.isLoading = false;
                this.activityRegistry.set(activity.id, activity);
                this.activity = this.getActivity(activity.id);
            })
        } catch (e) {
            this.isLoading = false;
            this.isFailure = true;
            console.log(e);
        }
    };

    @action.bound 
    async cancelAttendance(activity) {
        try {
            this.isLoading = true;
            await agent.Activities.cancelAttendance(activity);
            runInAction(() => {
                this.isLoading = false;
                activity.attendees = activity.attendees.filter(a => a.username !== authStore.currentUser.username);
                this.activityRegistry.set(activity.id, activity);
            })
        } catch (e) {
            this.isLoading = false;
            this.isFailure = true;
            console.log(e);
        }
    };

    @action editActivity = (id) => {
        this.activity = this.activityRegistry.get(id);
        this.editMode = true;
    };

    @action cancelEditActivity = (id) => {
        if (id) this.editMode = false;
        this.dialogOpen = false;
    };

    @action dialogToggle = (e) => {
        console.log(e);
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