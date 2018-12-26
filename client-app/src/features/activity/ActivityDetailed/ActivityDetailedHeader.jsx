import React from 'react';
import {Button, Header, Image, Item, Segment} from "semantic-ui-react";

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

const ActivityDetailedHeader = ({activity}) => {

    return (
        <Segment.Group>
            <Segment basic attached="top" style={{padding: '0'}}>
                <Image src="/assets/categoryImages/drinks.jpg" fluid style={activityImageStyle}/>

                <Segment basic style={activityImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size="huge"
                                    content={activity.title}
                                    style={{color: 'white'}}
                                />
                                <p>Activity Date</p>
                                <p>
                                    Hosted by <strong>{activity.host.username}</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>

            <Segment attached="bottom">
                <Button>Cancel My Place</Button>
                <Button color="teal">JOIN THIS EVENT</Button>

                <Button color="orange" floated="right">
                    Manage Activity
                </Button>
            </Segment>
        </Segment.Group>
    );
};

export default ActivityDetailedHeader;
