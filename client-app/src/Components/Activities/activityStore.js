import {observable, action, computed, runInAction, reaction} from "mobx";
import authStore from '../../Components/Auth/authStore';
import agent from '../../agent';
import {HubConnectionBuilder, LogLevel} from "@aspnet/signalr";
import {history} from '../../Common/RouterHistory';

const LIMIT = 3;

class ActivityStore {
    constructor() {
        reaction(
            () => this.predicate,
            predicate => this.loadActivities()
        )
    }
    
    @observable loading = false;
    @observable isFailure = false;
    @observable hubConnection = null;
    @observable activityRegistry = observable(new Map());
    @observable activityCount = 0;
    @observable page = 1;
    @observable totalPagesCount = 0;
    @observable activity = {
        attendees: [],
        comments: []
    };
    @observable editMode = false;
    @observable dialogOpen = false;
    @observable categories = [
        { key: 'drinks', text: 'Drinks', value: 'drinks' },
        { key: 'culture', text: 'Culture', value: 'culture' },
        { key: 'film', text: 'Film', value: 'film' },
        { key: 'food', text: 'Food', value: 'food' },
        { key: 'music', text: 'Music', value: 'music' },
        { key: 'travel', text: 'Travel', value: 'travel' }
    ];
    @observable isGoing;
    @observable username = null;
    @observable predicate = {};
    @computed get activities() {
        return Array.from(this.activityRegistry.values());
    }

    @computed get activitiesByDateFromStore() {
        return this.getActivitiesByDate(Array.from(this.activityRegistry.values()));
    }
    
    @computed get isGoingToSelectedActivity() {
        return this.activity.attendees.filter(a => a.username === this.username)[0];
    }

    @action createHubConnection = () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:5001/chat')
            .configureLogging(LogLevel.Information)
            .build();

        this.hubConnection.start()
            .then(() => console.log(this.hubConnection.id))
            .catch(err => console.log('Error while establishing connection : ', err));
        
        this.hubConnection.on('SendComment', (comment) => {
            console.log('hub activity');
            this.activity.comments.push(comment);
        });
    };
    
    @action stopHubConnection = () => {
        this.hubConnection.stop();
    };
    
    @action clear() {
        this.activityRegistry.clear();
        this.activityCount = 0;
        this.page = 1;
    }
    
    @action setPage(page) {
        this.page = page;
    }
    
    @action setPredicate = (predicate) => {
        console.log(predicate);
        if (JSON.stringify(predicate) === JSON.stringify(this.predicate)) return;
        this.clear();
        this.predicate = predicate;
    };
    
    $req() {
        if (this.predicate.host) return agent.Activities.byHost(this.predicate.host, this.page, LIMIT);
        if (this.predicate.going) return agent.Activities.byUserGoing(this.predicate.going, this.page, LIMIT);
        if (this.predicate.startDate) return agent.Activities.byStartDate(this.predicate.startDate, this.page, LIMIT);
        if (this.predicate.username) return agent.Activities.byUsername(this.predicate.username, this.predicate.date, this.page, LIMIT);
        return agent.Activities.all(this.page, LIMIT)
    }

    @action loadActivities() {
        this.loading = true;
        return this.$req()
            .then(action(({activities, activityCount}) => {
                this.activityRegistry.clear();
                this.activityCount = activityCount;
                this.totalPagesCount = Math.ceil(activityCount / LIMIT);
                activities.forEach(activity => {
                    this.activityRegistry.set(activity.id, activity);
                });
            }))
            .finally(action(() => {this.loading = false}))
    }
    
    @action.bound loadActivity(id, {acceptCached = false} = {}) {
        if (acceptCached) {
            const activity = this.getActivity(id);
            console.log('cached activity', activity);
            if (activity) {
                this.activity = activity;
                return Promise.resolve(activity);
            } 
        }
        console.log('not found in cache, sending request to api');
        this.loading = true;
        return agent.Activities.get(id)
            .then(action((activity) => {
                this.activityRegistry.set(activity.id, activity);
                this.activity = activity;
                this.loading = false;
                return activity;
            }))
            .finally(action(() => {
                this.loading = false;
            }));
    }

    @action 
    async addActivity(activityToCreate) {
        try {
            this.loading = true;
            const activity = await agent.Activities.create(activityToCreate);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
            });
            history.push('/activities');
            this.loading = false;
            return activity;
        } catch (e) {
            this.isFailure = true;
            this.loading = false;
            console.log(e);
        }
    };

    @action 
    async updateActivity(activityToUpdate) {
        console.log('update activity fired');
        try {
            this.loading = true;
            const activity = await agent.Activities.update(activityToUpdate);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.activity = this.getActivity(activity.id);
            });
            this.loading = false;
            return activity;
        } catch (e) {
            this.loading = false;
            this.isFailure = true;
            console.log(e);
        }
    };
    
    @action setUsername = (username) => {
        this.username = username;
    };

    @action selectActivity = (id) => {
        this.activity = this.getActivity(id);
    };
    
    @action clearActivity() {
        this.activity = null;
    }

    @action
    attendActivity = async (activityToAttend) => {
        const attendee = {
            dateJoined: new Date(),
            image: authStore.currentUser.image,
            isHost: false,
            username: authStore.currentUser.username
        };
        activityToAttend.attendees.push(attendee);
        this.activityRegistry.set(activityToAttend.id, activityToAttend);
        try {
            await agent.Activities.attend(activityToAttend);
        } catch (e) {
            this.isFailure = true;
            console.log(e);
        }
    };

    @action.bound 
    async cancelAttendance(activity) {
        this.activity.attendees = this.activity.attendees.filter(a => a.username !== authStore.currentUser.username);
        this.activityRegistry.set(activity.id, activity);
        try {
            await agent.Activities.cancelAttendance(activity);
        } catch (e) {
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
    
    @action addComment = async (body) => {
        try {
            await agent.Comments.add(this.activity.id, body);
            // this.activity.comments.push(res);
        } catch (err) {
            console.log(err)
        }
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