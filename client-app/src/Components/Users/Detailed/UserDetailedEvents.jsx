import React from 'react';
import { Card, Grid, Header, Image, Segment, Tab } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import format from 'date-fns/format'

const panes = [
    {menuItem: 'All Events', pane: {key: 'allEvents'}},
    {menuItem: 'Past Events', pane: {key: 'pastEvents'}},
    {menuItem: 'Future Events', pane: {key: 'futureEvents'}},
    {menuItem: 'Hosting', pane: {key: 'hosted'}},
];

const UserDetailedEvents = ({activities, changeTab, loading}) => {
    return (
        <Grid.Column width={12}>
            <Segment attached loading={loading}>
                <Header icon="calendar" content="Events" />
                <Tab panes={panes} menu={{secondary: true, pointing: true}} onTabChange={(e, data) => changeTab(e, data)}/>
                <br/>

                <Card.Group itemsPerRow={5}>
                    {activities && activities.map((activity) => (
                        <Card key={activity.id} as={Link} to={`/activities/${activity.id}`}>
                            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
                            <Card.Content>
                                <Card.Header textAlign="center">{activity.title}</Card.Header>
                                <Card.Meta textAlign="center">
                                    <div>{format(activity.date, 'Do LLL')}</div>
                                    <div>{format(activity.date, 'h:mm a')}</div>
                                </Card.Meta>
                            </Card.Content>
                        </Card>
                    ))}
                </Card.Group>
            </Segment>
        </Grid.Column>
    );
};

export default UserDetailedEvents;
