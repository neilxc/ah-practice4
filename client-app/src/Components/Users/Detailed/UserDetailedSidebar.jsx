import React, {Fragment} from 'react';
import {Button, Grid, Label, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

const UserDetailedSidebar = ({isCurrentUser, profile: {following, username}, follow, unfollow, loading}) => {
    return (
        <Grid.Column width={4}>
            <Segment>
                {isCurrentUser && <Button as={Link} to="/settings" color="teal" fluid basic content="Edit Profile"/>}
                {!isCurrentUser && !following &&
                <Button
                    onClick={() => follow(username)}
                    loading={loading}
                    color="teal"
                    fluid
                    basic
                    content="Follow user"/>
                }
                {!isCurrentUser && following &&
                    <Fragment>
                        <Label color={'green'} attached='top'>You are following {username}</Label>
                        <Button
                            onClick={() => unfollow(username)}
                            loading={loading}
                            color="teal"
                            fluid
                            basic
                            content="Unfollow user"
                        />
                    </Fragment>

                }
            </Segment>
        </Grid.Column>
    );
};

export default UserDetailedSidebar;
