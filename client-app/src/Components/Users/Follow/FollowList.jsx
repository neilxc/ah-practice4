import React, {Component} from 'react';
import {Image, List} from "semantic-ui-react";
import {inject, observer} from "mobx-react";
import LoadingComponent from "../../../Layouts/LoadingComponent";
import {withRouter} from "react-router-dom";

@withRouter
@inject('modalStore', 'userStore')
@observer
class FollowList extends Component{
    async componentWillMount() {
        const {userStore, username, type} = this.props;
        await userStore.listFollowings(username, type);
    }
    
    handleItemClick = (username) => {
        this.props.history.push(`/profile/${username}`);
        this.props.modalStore.closeModal();
    };

    render() {
        const {userStore: {followLoading, followedPeople}} = this.props;
        if (followLoading) return <LoadingComponent content={'Loading...'}/>;
        
        return (
            <List animated verticalAlign='middle'>
                {followedPeople.map((profile) => (
                    <List.Item key={profile.username} as={'a'} onClick={() => this.handleItemClick(profile.username)}>
                        <Image avatar src={profile.image || '/assets/user.png'} />
                        <List.Content>
                            <List.Header>{profile.username}</List.Header>
                        </List.Content>
                    </List.Item>
                ))}

            </List>
        )
    }
}

export default FollowList;