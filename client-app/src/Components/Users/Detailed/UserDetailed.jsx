import React, {Component} from 'react';
import {Grid} from 'semantic-ui-react';
import UserDetailedHeader from "./UserDetailedHeader";
import LoadingComponent from "../../../Layouts/LoadingComponent";
import UserDetailedDescription from "./UserDetailedDescription";
import UserDetailedSidebar from "./UserDetailedSidebar";
import UserDetailedPhotos from "./UserDetailedPhotos";
import UserDetailedEvents from "./UserDetailedEvents";
import {inject, observer} from "mobx-react";

@inject('userStore', 'authStore', 'activityStore', 'modalStore')
@observer
class UserDetailedPage extends Component {
    async componentWillMount() {
        const username = this.props.match.params.id;
        await this.props.userStore.loadProfile(username);
        this.props.activityStore.setPredicate({username: username});
        // this.props.activityStore.loadActivities();
    }
    
    followUser = async (username) => {
        await this.props.userStore.followUser(username)
    };
    
    unfollowUser = async (username) => {
        await this.props.userStore.unfollowUser(username)
    };
    
    changeTab = (e, data) => {
        const {activityStore: {setPredicate}} = this.props;
        const activeTab = data.activeIndex;
        const username = this.props.match.params.id;
        switch (activeTab) {
            case 1:
                setPredicate({username: username, date: 'past'});
                break;
            case 2:
                setPredicate({username: username, date: 'future'});
                break;
            case 3:
                setPredicate({host: username});
                break;
            default:
                setPredicate({username: username})
        }
    };

    render() {
        const {
            userStore:
                {loading: profileLoading, profile, followLoading},
            authStore: {currentUser},
            activityStore: {activities, loading: activitiesLoading},
            modalStore: {openModal}
        } = this.props;
        // const {profile, photos, auth, match, requesting, events, eventsLoading, followUser, following, unfollowUser} = this.props;
        if (profileLoading) return <LoadingComponent inverted={true}/>;
        const isCurrentUser = (profile.username === currentUser.username);
        return (
            <Grid>
                <UserDetailedHeader profile={profile}/>
                <UserDetailedDescription profile={profile} openModal={openModal}/>
                <UserDetailedSidebar 
                    isCurrentUser={isCurrentUser} 
                    profile={profile} 
                    follow={this.followUser} 
                    unfollow={this.unfollowUser}
                    loading={followLoading}
                />
                <UserDetailedPhotos photos={profile.photos}/>
                <UserDetailedEvents activities={activities} changeTab={this.changeTab} loading={activitiesLoading}/>
            </Grid>
        );
    }
}

export default UserDetailedPage;
