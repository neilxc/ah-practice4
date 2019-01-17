import React, {Fragment, Component} from 'react';
import {Grid, Paper, Typography, List} from "@material-ui/core";
import Item from './Item';
import format from 'date-fns/format'
import Form from "./Form";
import Details from "./Details";
import {withContext} from "../../context";
import {inject, observer} from "mobx-react";

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'row wrap',
        padding: 20,
        width: '100%',
        marginTop: 60
    },
    paperLeft: {
        flex: 1,
        margin: 10,
        padding: 10
    },
    paperRight: {
        flex: 4,
        marginTop: 10 + 47,
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

@withContext
@inject('activityStore')
@observer
class Activities extends Component {
    componentDidMount() {
        this.props.activityStore.loadActivities();
    }

    render() {
        const {
            onEdit,
            cancelFormEdit,
            activityStore: {
                activitiesByDateFromStore,
                selectActivity,
                activity,
                editMode
            }
        } = this.props;
        
        return(
            <Grid container spacing={16} style={styles.root}>

                <Grid item xs={6}>
                    {activitiesByDateFromStore.map(([group, activities]) =>
                        <Fragment key={group}>
                            <Typography variant={'overline'} style={styles.date} gutterBottom>
                                {format(group, 'EEEE dd MMMM')}
                            </Typography>
                            <List>
                                {activities.map((activity) =>
                                    <Item
                                        key={activity.id}
                                        activity={activity}
                                        onSelect={selectActivity}
                                    />
                                )}
                            </List>

                        </Fragment>
                    )}
                </Grid>
                <Grid item xs={6}>
                    {editMode
                        ? <Paper style={styles.paperRight}>
                            <Form
                                activity={activity}
                                onSubmit={onEdit}
                                cancelFormEdit={cancelFormEdit}
                            />
                        </Paper>
                        : activity ?
                            <Details
                                activity={activity}
                            /> : null
                    }

                </Grid>
            </Grid>
        )
    }
}

export default Activities;