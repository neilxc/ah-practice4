import React from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

const eventImageStyle = {
    filter: 'brightness(30%)'
};

const eventImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

export default({activity, isHost, isGoing, attendActivity, cancelAttendance}) =>
        <Segment.Group>
            <Segment basic attached="top" style={{ padding: '0' }}>
                <Image
                    src={`/assets/categoryImages/${activity.category}.jpg`}
                    fluid
                    style={eventImageStyle}
                />

                <Segment basic style={eventImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size="huge"
                                    content={activity.title}
                                    style={{ color: 'white' }}
                                />
                                <p>{format(activity.date, 'EEEE do LLLL')}</p>
                                <p>
                                    Hosted by <strong>{activity.host.username}</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>

            <Segment attached="bottom">
                {!isHost && (
                    <div>
                        {isGoing ? (
                            <Button onClick={() => cancelAttendance(activity)}>Cancel My Place</Button>
                        ) : (
                            <Button onClick={() => attendActivity(activity)} color="teal">JOIN THIS EVENT</Button>
                        )}
                    </div>
                )}
                
                {isHost && (
                    <Button
                        as={Link}
                        to={`/manage/${activity.id}`}
                        color="orange"
                    >
                        Manage Event
                    </Button>
                )}
            </Segment>
        </Segment.Group>