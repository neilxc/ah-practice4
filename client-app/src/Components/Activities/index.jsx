import React, {Fragment, Component} from 'react';
import {Grid, Paper, Typography, List, Button, Card} from "@material-ui/core";
import Item from './Item';
import format from 'date-fns/format'
import data from "../../activities";
import Details from "./Details";

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'row wrap',
        padding: 20,
        width: '100%'
    },
    paperLeft: {
        flex: 1,
        margin: 10,
        padding: 10
    },
    paperRight: {
        flex: 4,
        margin: 10 + 47,
        padding: 10,
    },
    date: {
        textTransform: 'uppercase',
        marginTop: 10,
        fontSize: 14
    },
    typography: {
        flex: 1
    }
};

export default ({
                    activitiesByDate,
                    onSelect,
                    activity: {
                        id,
                        title = 'Welcome',
                        description = 'Please select an activity from the list',
                        category,
                        date,
                        city,
                        venue
                    }
                }) => (
    <Grid container spacing={16} style={styles.root}>
        <Grid item xs={8}>
            {activitiesByDate.map(([group, activities]) =>
                <Fragment key={group}>
                    <Typography variant={'overline'} style={styles.date} gutterBottom>
                        {format(group, 'dddd D MMMM')}
                    </Typography>
                    <List>
                        {activities.map((activity) =>
                            <Item key={activity.id} activity={activity} onSelect={onSelect}/>
                        )}
                    </List>

                </Fragment>
            )}
        </Grid>
        <Grid item xs={4}>
            <Details/>
        </Grid>
    </Grid>
);
