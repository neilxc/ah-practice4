import React, {Component} from 'react';
import {Header} from './Layouts';
import Activities from './Components/Activities';
import data from './activities.json';
import * as _ from 'lodash';
import format from 'date-fns/format';

const categories = [
    'drinks', 'food', 'music', 'culture', 'travel'
];

class App extends Component {
    state = {
        activities: data.activities,
        activitiesByDate: [],
        categories,
        activity: null,
        editMode: false,
        dialogOpen: false
    };

    getActivitiesByDate() {
        const sortedActivities = this.state.activities.sort((a, b) => 
            new Date(a.date).getTime() - new Date(b.date).getTime());
        return Object.entries(
            sortedActivities.reduce((activities, activity) => {
                const date = activity.date.split('T')[0];
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities
            }, {})
        );
    }
    
    handleDialogToggle = () => 
        this.setState({
            dialogOpen: !this.state.dialogOpen
        });

    handleActivityCreate = activity => {
        this.setState(({activities}) => ({
            activities: [...activities,
                activity]
        }));
        this.getActivitiesByDate();
    };
    
    handleActivitySelect = id => 
        this.setState(({activities}) => ({
            activity: activities.find(a => a.id === id),
            editMode: false
        }));
    
    handleActivitySelectEdit = id => {
        this.setState(({activities}) => ({
            activity: activities.find(a => a.id === id),
            editMode: true
        }));
    };

    handleActivityEdit = activity => {
        this.setState(({activities}) => ({
            activities: activities.map(a => {
                if (a.id === activity.id) {
                    return {...activity}
                } else {
                    return a
                }
            }),
            editMode: false,
            activity
        }));
    };

    handleCancelFormEdit = () => {
        this.setState({
            editMode: false,
            dialogOpen: false
        })
    };


        
    render() {
        const activitiesByDate = this.getActivitiesByDate();
        const {activity, editMode, categories, dialogOpen} = this.state;
        return (
            <div>
                <Header 
                    onActivityCreate={this.handleActivityCreate}
                    categories={categories}
                    dialogOpen={dialogOpen}
                    dialogToggle={this.handleDialogToggle}
                    cancelFormEdit={this.handleCancelFormEdit}
                />
                <Activities 
                    editMode={editMode}
                    dialogOpen={dialogOpen}
                    categories={categories}
                    activitiesByDate={activitiesByDate} 
                    activity={activity}
                    onSelect={this.handleActivitySelect}
                    onSelectEdit={this.handleActivitySelectEdit}
                    onEdit={this.handleActivityEdit}
                    cancelFormEdit={this.handleCancelFormEdit}
                />
            </div>
        );
    }
}

export default App;
