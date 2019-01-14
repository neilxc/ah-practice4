import data from '../../activities.json';
import {observable} from "mobx";

class ActivityStore {
    @observable activityRegistry = observable(new Map());
    @observable testObservable = 'Testing 123';
}

export default new ActivityStore();