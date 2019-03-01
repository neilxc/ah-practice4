import React from 'react';
import {Image, Item, Label, List, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default ({attendees}) =>
    <div>
        <Segment
            textAlign="center"
            style={{border: 'none'}}
            attached="top"
            secondary
            inverted
            color="teal"
        >
            {attendees && attendees.length} {attendees && attendees.length === 1 ? 'Person' : 'People'} Going
        </Segment>
        <Segment attached>
            <List relaxed divided>
                {attendees.map((attendee) => (
                    <Item key={attendee.username} style={{position: 'relative'}}>
                        {attendee.isHost &&
                        <Label
                            style={{position: 'absolute'}}
                            color="orange"
                            ribbon="right"
                        >
                            Host
                        </Label>}
                        <Image size="tiny" src={attendee.image || '/assets/user.png'}/>
                        <Item.Content verticalAlign="middle">
                            <Item.Header as="h3">
                                <Link to={`/profile/${attendee.username}`}>{attendee.username}</Link>
                            </Item.Header>
                            {attendee.following &&
                                <Item.Extra style={{color: 'orange'}}>Following</Item.Extra>
                            }
                        </Item.Content>
                    </Item>
                ))}

            </List>
        </Segment>
    </div>