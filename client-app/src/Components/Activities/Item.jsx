import React from 'react';
import {Typography, Grid, Card, CardActionArea} from "@material-ui/core";
import format from 'date-fns/format';

const styles = {
    paper: {
        padding: 10
    }
};

export default ({activity, onSelect}) =>
    <CardActionArea>
        <Card style={styles.paper} onClick={() => onSelect(activity.id)}>
            <Grid container>
                <Grid item sm={2}>
                    <Typography variant={'h6'}>
                        {format(activity.date, 'h:mm a')}
                    </Typography>
                </Grid>
                <Grid item sm={10}>
                    <Typography variant={'h6'} >
                        {activity.title}
                    </Typography>
                    <Typography variant={'subtitle1'}>
                        {activity.description}
                    </Typography>
                    <Typography variant={'body1'} color={'secondary'}>
                        {activity.attendees.length} {activity.attendees.length === 1 ? 'member is' : 'members are'} going to this activity
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    </CardActionArea>
