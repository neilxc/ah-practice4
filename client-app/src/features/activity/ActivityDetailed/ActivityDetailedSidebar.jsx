import React, {Fragment} from 'react';
import {Item, Label, Segment} from "semantic-ui-react";

const ActivityDetailedSidebar = ({attendees}) => {
    return (
        <Fragment>
            <Segment
                textAlign="center"
                style={{border: 'none', fontWeight: 'bold'}}
                attached="top"
                secondary
                inverted
                color="teal"
            >
                {attendees && attendees.length} {attendees && attendees.length === 1 ? 'Person' : 'People'} Going
            </Segment>
            <Segment attached>
                <Item.Group relaxed divided>
                    {attendees && attendees.map(attendee => (
                        <Item key={attendee.username} style={{position: 'relative'}}>
                            {attendee.isHost &&
                            <Label
                                style={{position: 'absolute'}}
                                color="orange"
                                ribbon="right"
                            >
                                Host
                            </Label>}
                            <Item.Image size="tiny" src={attendee.image || "/assets/user.png"}/>
                            <Item.Content verticalAlign="middle">
                                <Item.Header as="h3">
                                    <a href="kbs">{attendee.username}</a>
                                </Item.Header>
                            </Item.Content>
                        </Item>
                    ))}
                </Item.Group>
            </Segment>
        </Fragment>
    );
};

export default ActivityDetailedSidebar;
