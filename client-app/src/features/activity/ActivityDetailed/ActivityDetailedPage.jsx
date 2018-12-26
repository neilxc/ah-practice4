import React, {Component} from 'react';
import {Grid} from "semantic-ui-react";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";
import {inject, observer} from "mobx-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

@inject('activityStore') @observer
class ActivityDetailedPage extends Component {

    async componentDidMount() {
        const id = this.props.match.params.id;
        await this.props.activityStore.getActivity(id);
    }

    render() {
        const {activity, isLoadingDetail} = this.props.activityStore;
        if (isLoadingDetail) return <LoadingComponent inverted={true}/>;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <ActivityDetailedHeader activity={activity}/>
                    <ActivityDetailedInfo activity={activity}/>
                    <ActivityDetailedChat/>
                </Grid.Column>
                <Grid.Column width={6}>
                    <ActivityDetailedSidebar attendees={activity.attendees}/>
                </Grid.Column>
            </Grid>
        );
    }
}

export default ActivityDetailedPage;