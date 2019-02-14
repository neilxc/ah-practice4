import React, {Component} from 'react';
import {List, ListItem, ListItemAvatar, Avatar, ListItemText} from "@material-ui/core";

class Attendees extends Component {
    render() {
        const {attendees} = this.props;
        // {activity.attendees.map((attendee) => (
        //     <ListItem key={attendee.username}>
        //         <Avatar src={attendee.image}>
        //             {attendee.username.charAt(0).toUpperCase()}
        //         </Avatar>
        //         <ListItemText primary={attendee.username}/>
        //     </ListItem>
        // ))}
        return (
                <List>
                    {attendees.map((attendee) => (
                        <ListItem key={attendee.username}>
                            <ListItemAvatar>
                                <Avatar src={attendee.image}>
                                    {attendee.username.charAt(0).toUpperCase()}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={attendee.username} />
                        </ListItem>
                    ))}
                </List>
        )
    }
}

export default Attendees;