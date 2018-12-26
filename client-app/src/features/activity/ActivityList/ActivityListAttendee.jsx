import React, {Component} from 'react';
import {Image, List} from "semantic-ui-react";

class ActivityListAttendee extends Component {
    render() {
        const {attendee} = this.props;
        return (
            <List.Item>
                <Image as='a' size={'mini'} circular src={attendee.image || '/assets/user.png'}/>
            </List.Item>
        );
    }
}

export default ActivityListAttendee;