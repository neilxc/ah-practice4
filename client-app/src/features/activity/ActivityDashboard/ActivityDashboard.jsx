import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Grid} from "semantic-ui-react";
import ActivityList from "../ActivityList/ActivityList";
import LoadingComponent from "../../../app/layout/LoadingComponent";

@inject('activityStore', 'userStore')
@observer
class ActivityDashboard extends Component {
    async componentDidMount() {
        await this.props.activityStore.getActivities();
    }

    render() {
        const {activities, isLoading} = this.props.activityStore;
        if (isLoading) return <LoadingComponent inverted={true}/>;

        return (
            <Grid>
                <Grid.Column width={10}>
                    <ActivityList activities={activities} isLoading={isLoading}/>
                </Grid.Column>
            </Grid>
        );
    }
}

export default ActivityDashboard;