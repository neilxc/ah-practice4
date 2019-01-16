import data from '../../activities.json';
import {observable, action, computed} from "mobx";

class ActivityStore {
    @observable activityRegistry = observable(new Map());
    @observable answer = 42;

    @computed get activitiesFromStore() {
        return Array.from(this.activityRegistry.values());
    }

    @computed get activitiesByDateFromStore() {
        return this.getActivitiesByDate(Array.from(this.activityRegistry.values()));
        // return Array.from(this.activityRegistry.values());
    }
    
    @computed get answerDoubled() {
        return this.answer * 2
    }
    
    @action incrementCounter = () => {
        this.answer++
    };
    
    @action decrementCounter = () => {
        this.answer--;
    };
    
    @action loadActivities() {
        data.activities.forEach(activity => {
            this.activityRegistry.set(activity.id, activity);
        })
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

    // @action loadEvents() {
    //     this.isLoading = true;
    //     return agent.Events.all()
    //         .then(action(({events}) => {
    //             this.eventsRegistry.clear();
    //             events.forEach(event => {
    //                 event.host = event.attendees.filter(h => h.isHost === true)[0];
    //                 this.eventsRegistry.set(event.id, event);
    //             });
    //         }))
    //         .finally(action(() => {this.isLoading = false}));
    // }

}

export default new ActivityStore();