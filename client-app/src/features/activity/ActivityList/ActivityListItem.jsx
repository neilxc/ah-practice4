import React, {Component} from 'react';
import {Button, Icon, Item, List, Segment} from "semantic-ui-react";
import ActivityListAttendee from "./ActivityListAttendee";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";

@observer
class ActivityListItem extends Component {
    render() {
        const {activity} = this.props;
        const {attendees} = activity;
        return (
            <Segment.Group>
                <Segment>
                    <Item.Group>
                        <Item>
                            <Item.Image size="tiny" circular src={activity.host.image || "/assets/user.png"}/>
                            <Item.Content>
                                <Item.Header as="a">{activity.title}</Item.Header>
                                <Item.Description>
                                    Hosted by <a href="link">{activity.host.username}</a>
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
                <Segment>
                           <span>
                             <Icon name="clock"/> {activity.date} |
                             <Icon name="marker"/> {activity.venue}
                           </span>
                </Segment>
                <Segment secondary>
                    <List horizontal>
                        {attendees && attendees.map((attendee) => (
                            <ActivityListAttendee key={attendee.username} attendee={attendee}/>
                        ))}
                    </List>
                </Segment>
                <Segment clearing>
                    <Button as={Link} to={`/activities/${activity.id}`} color="teal" floated="right" content="View"/>
                </Segment>
            </Segment.Group>
        );
    }
}

export default ActivityListItem;