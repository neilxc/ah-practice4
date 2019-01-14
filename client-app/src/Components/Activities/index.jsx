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
@observer
@inject('activityStore')    
class Activities extends Component {
    render() {
        const {
            activitiesByDate,
            onSelect,
            activity,
            onSelectEdit,
            editMode,
            categories,
            onEdit,
            cancelFormEdit,
            attendActivity,
            cancelAttendance
        } = this.props;
        const {testObservable} = this.props.activityStore;
        
        return(
            <Grid container spacing={16} style={styles.root}>

                <Grid item xs={6}>
                    <Typography variant={'h6'}>
                        {testObservable}
                    </Typography>
                    {activitiesByDate.map(([group, activities]) =>
                        <Fragment key={group}>
                            <Typography variant={'overline'} style={styles.date} gutterBottom>
                                {format(group, 'EEEE dd MMMM')}
                            </Typography>
                            <List>
                                {activities.map((activity) =>
                                    <Item
                                        key={activity.id}
                                        activity={activity}
                                        onSelect={onSelect}
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
                                categories={categories}
                                onSubmit={onEdit}
                                cancelFormEdit={cancelFormEdit}
                            />
                        </Paper>
                        : activity ?
                            <Details
                                activity={activity}
                                onSelectEdit={onSelectEdit}
                                attendActivity={attendActivity}
                                cancelAttendance={cancelAttendance}
                            /> : null
                    }

                </Grid>
            </Grid>
        )
    }
}

export default Activities;