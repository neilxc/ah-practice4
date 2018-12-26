import {observable, action, runInAction, toJS} from "mobx";
import agent from "../../agent";
import userStore from "../users/userStore";

class ActivityStore {
    @observable isLoading = true;
    @observable isFailure = false;
    @observable isLoadingDetail = true;
    @observable activities = [];
    @observable activity = {};

    @action async getActivities() {
        try {
            const data = await agent.Activities.all();
            runInAction(() => {
                data.activities.forEach((activity) => {
                    activity.host = activity.attendees.filter(h => h.isHost === true)[0];
                });
                this.isLoading = false;
                this.activities = data.activities;
            })
        } catch (e) {
            runInAction(() => {
                this.isLoading = false;
                this.isFailure = true;
                this.activities = [];
            })
        }
    }

    @action async getActivity(id) {
        try {
            const data = await agent.Activities.get(id);
            runInAction(() => {
                this.isLoadingDetail = false;
                data.host = data.attendees.filter(h => h.isHost === true)[0];
                this.activity = data;
            })
        } catch (e) {
            runInAction(() => {
                this.isLoadingDetail = false;
                this.activity = {};
            })
        }
    }

    @action
    createActivity = (activityToCreate) => {
        const newActivity = {...activityToCreate};
        let attendees = [];
        let attendee = userStore.currentUser;
        attendee.isHost = true;
        attendees.push(attendee);
        newActivity.attendees = attendees;
        newActivity.host = attendees.filter(h => h.isHost === true)[0];
        newActivity.id = 99;
        console.log(newActivity);

        this.events.push(newActivity);
        console.log(toJS(this.activities));
    }
}

export default new ActivityStore();