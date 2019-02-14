import React, {Fragment, Component} from 'react';
// import {Grid, Paper, Typography, List} from "@material-ui/core";
import Item from './Item';
import format from 'date-fns/format'
import {withContext} from "../../context";
import {inject, observer} from "mobx-react";
import {Grid, Header, List} from "semantic-ui-react";
import Filters from "./Filters";

@withContext
@inject('activityStore')
@observer
class Activities extends Component {
    componentDidMount() {
        console.log('about to load some activities');
        this.props.activityStore.loadActivities();
    }
    
    componentDidUpdate(prevProps, ps, sn) {
        if (this.props !== prevProps) {
            this.props.activityStore.loadActivities();
        }
    }

    render() {
        const {
            activityStore: {
                activitiesByDateFromStore,
                selectActivity,
            }
        } = this.props;

        return (
            <Grid>
                <Grid.Column width={10}>
                    {activitiesByDateFromStore.map(([group, activities]) =>
                        <Fragment key={group}>
                            <Header sub color={'teal'}>
                                {format(group, 'EEEE dd MMMM')}
                            </Header>
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
                </Grid.Column>
                <Filters/>
            </Grid>
        )
    }
}

export default Activities;