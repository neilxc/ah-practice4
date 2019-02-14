import React from 'react';
import {Button, Grid, Icon, Segment} from "semantic-ui-react";
import format from 'date-fns/format';

export default({activity}) =>
    <Segment.Group>
        <Segment attached="top">
            <Grid>
                <Grid.Column width={1}>
                    <Icon size="large" color="teal" name="info" />
                </Grid.Column>
                <Grid.Column width={15}>
                    <p>{activity.description}</p>
                </Grid.Column>
            </Grid>
        </Segment>
        <Segment attached>
            <Grid verticalAlign="middle">
                <Grid.Column width={1}>
                    <Icon name="calendar" size="large" color="teal" />
                </Grid.Column>
                <Grid.Column width={15}>
                    <span>{format(activity.date, 'eeee do MMMM')} at {format(activity.date, 'h:mm a')}</span>
                </Grid.Column>
            </Grid>
        </Segment>
        <Segment attached>
            <Grid verticalAlign="middle">
                <Grid.Column width={1}>
                    <Icon name="marker" size="large" color="teal" />
                </Grid.Column>
                <Grid.Column width={11}>
                    <span>{activity.venue}</span>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Button color="teal" size="tiny" content={'Show Map'}/>
                </Grid.Column>
            </Grid>
        </Segment>
    </Segment.Group>