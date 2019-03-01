import React from 'react';
import {Button, Grid, Header, Segment} from 'semantic-ui-react';
import FollowList from "../Follow/FollowList";

const UserDetailedDescription = ({profile, openModal}) => {
    return (
        <Grid.Column width={12}>
            <Segment>
                <Grid columns={2}>
                    <Grid.Column width={8}>
                        <Header content={'About ' + profile.username} />
                        <p>
                            <strong>Occupation: </strong> {profile.occupation || 'unknown'}
                        </p>
                        <p>
                            <strong>Origin: </strong> {profile.origin || 'unknown'}
                        </p>
                        <p>
                            <strong>Member since: </strong> {profile.createdAt || 'unknown'}
                        </p>
                        <p>{profile.bio}</p>
                    </Grid.Column>
                    <Grid.Column width={4} textAlign={'center'}>
                        <Header content="Following" />
                        <Button 
                            size={'huge'} 
                            content={profile.followingCount} 
                            color={'blue'}
                            disabled={profile.followingCount === 0}
                            onClick={() => openModal({
                                component: <FollowList type={'following'} username={profile.username}/>,
                                header: `${profile.username} is following:`
                            })}
                        />
                    </Grid.Column>
                    <Grid.Column width={4} textAlign={'center'}>
                        <Header content="Followers" textAlign={'center'} />
                        <Button 
                            size={'huge'} 
                            content={profile.followersCount}
                            disabled={profile.followersCount === 0}
                            color={'blue'}
                            onClick={() => openModal({
                                component: <FollowList type={'followers'} username={profile.username}/>,
                                header: `Followers of ${profile.username}`
                            })}
                        />
                    </Grid.Column>
                </Grid>
            </Segment>
        </Grid.Column>
    );
};

export default UserDetailedDescription;
