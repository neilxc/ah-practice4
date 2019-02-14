import React from 'react';
import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import {Button, Icon, Image, Item, List, Segment} from "semantic-ui-react";
import {format} from 'date-fns'

export default observer(({activity, onSelect}) =>
    <Segment.Group>
        <Segment>
            <Item.Group>
                <Item>
                    <Item.Image size={'tiny'} circular src={activity.attendees.filter(a => a.isHost)[0].image ||'assets/user.png'}/>
                    <Item.Content>
                        <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
                        <Item.Description>
                            Hosted by {activity.attendees.filter(a => a.isHost)[0].username}
                        </Item.Description>
                    </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
        <Segment>
            <span>
                <Icon name={'clock'}/> {format(activity.date, 'EEEE do LLLL')}
                <Icon name={'marker'}/> {activity.venue}
            </span>
        </Segment>
        <Segment secondary>
            <List horizontal>
                {activity.attendees.map((attendee) => (
                    <List.Item key={attendee.username}>
                        <Image size={'mini'} circular src={attendee.image || '/assets/user.png'}/>
                    </List.Item>
                ))}
            </List>
        </Segment>
        <Segment clearing>
            <span>{activity.description}</span>
            <Button as={Link} to={`/activities/${activity.id}`} color="teal" floated="right" content="View" />
        </Segment>
    </Segment.Group>
)
