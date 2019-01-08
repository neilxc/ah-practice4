import React, {Component} from 'react';
import {Header} from './Layouts';
import Activities from './Components/Activities';
import data from './activities.json';
import {Provider} from './context';

const categories = [
    'drinks', 'food', 'music', 'culture', 'travel'
];

class App extends Component {
    state = {
        activities: data.activities,
        activitiesByDate: [],
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
                activity],
            dialogOpen: false
        }));
        
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

    handleActivityAttendance = (activity) => {
        const attendee = {
            username: "testuser",
            dateJoined: new Date(),
            image: null,
            isHost: false
        };
        this.setState(({activities}) => ({
            activities: activities.map(a => {
                if (a.id === activity.id) {
                    activity.attendees = [...activity.attendees, attendee];
                    return {...activity}
                } else {
                    return a
                }
            })
        }))
    };

    handleCancelAttendance = (activity) => {
        const username = 'testuser';
        this.setState(({activities}) => ({
            activities: activities.map(a => {
                if (a.id === activity.id) {
                    activity.attendees = [...activity.attendees.filter(a => a.username !== username)];
                    return {...activity}
                } else {
                    return a
                }
            })
        }));
    };

    getContext = () => ({
        categories,
        ...this.state,
        onActivityCreate: this.handleActivityCreate,
        dialogToggle: this.handleDialogToggle,
        cancelFormEdit: this.handleCancelFormEdit,
        onSelect: this.handleActivitySelect,
        onSelectEdit: this.handleActivitySelectEdit,
        onEdit: this.handleActivityEdit,
        attendActivity: this.handleActivityAttendance,
        cancelAttendance: this.handleCancelAttendance,
        activitiesByDate: this.getActivitiesByDate()
    });
        
    render() {
        // const activitiesByDate = this.getActivitiesByDate();
        return (
            <Provider value={this.getContext()}>
                <div>
                    <Header />
                    <Activities />
                </div>
            </Provider>
            
        );
    }
}

export default App;
