import React from 'react';
import {Grid, Header, Item, Segment} from 'semantic-ui-react';

const UserDetailedHeader = ({profile}) => {
    return (
        <Grid.Column width={16}>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image
                            avatar
                            size="small"
                            src={profile.image || '/assets/user.png'}
                        />
                        <Item.Content verticalAlign="bottom">

                            <Header as="h1">{profile.username}</Header>
                            <br />
                            <Header as="h3">{profile.occupation}</Header>
                            <br />
                            <Header as="h3">44, Lives in {profile.city}</Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        </Grid.Column>
    );
};

export default UserDetailedHeader;
