import React, {Component} from 'react';
import {Header} from './Layouts';
import Activities from './Components/Activities';
import data from './activities.json';

class App extends Component {
    state = {
        activities: data.activities,
        activitiesByDate: [],
        activity: {}
    };

    getActivitiesByDate() {
        return Object.entries(
            this.state.activities.reduce((activities, activity) => {
                const date = activity.date.split('T')[0];
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities
            }, {})
        );
    }

    handleActivityCreate = activity => {
        this.setState(({activities}) => ({
            activities: [...activities,
                activity]
        }));
    };

    handleActivitySelect = id => {
        console.log('fired activity select');
        this.setState(({activities}) => ({
            activity: activities.find(a => a.id === id)
        }))
    };

    render() {
        const activitiesByDate = this.getActivitiesByDate();
        const {activity} = this.state;
        return (
            <div>
                <Header onActivityCreate={this.handleActivityCreate}/>
                <Activities 
                    activitiesByDate={activitiesByDate} 
                    activity={activity}
                    onSelect={this.handleActivitySelect}
                />
            </div>
        );
    }
}

export default App;
