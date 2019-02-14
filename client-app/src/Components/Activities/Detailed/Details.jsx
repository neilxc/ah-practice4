import React from 'react';
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import Header from "./Header";
import Info from "./Info";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import {Grid} from "semantic-ui-react";
import MobxReactFormDevTools from 'mobx-react-form-devtools';

@withRouter
@inject('activityStore', 'authStore', 'commonStore')
@observer
class Details extends React.Component {
    componentWillMount() {
        console.log('re-mounting');
        const id = +this.props.match.params.id;
        this.props.activityStore.loadActivity(id, {acceptCached: true});
    }

    render() {
        const {
            activityStore: {addComment, username, attendActivity,cancelAttendance, activity},
            commonStore: {asyncLoading},
            authStore: {currentUser}
        } = this.props;
        if (asyncLoading > 0) return <p>Loading...</p>;
        const {attendees} = activity;
        const isHost = activity.host.username === currentUser.username;
        const isGoing = attendees && attendees.filter(a => a.username === currentUser.username)[0];

        return (
            <Grid>
                <Grid.Column width={10}>
                    <Header 
                        attendActivity={attendActivity}
                        cancelAttendance={cancelAttendance}
                        activity={activity}
                        isHost={isHost} 
                        isGoing={isGoing} 
                    />
                    <Info activity={activity}/>
                    <Chat activity={activity} />
                </Grid.Column>
                <Grid.Column width={6}>
                    <Sidebar attendees={attendees}/>
                </Grid.Column>
                <Grid.Column width={6}>
                    <MobxReactFormDevTools.UI />
                </Grid.Column>
            </Grid>
        );
    }
}

export default Details;
