import React, {Fragment, Component} from 'react';
// import {Grid, Paper, Typography, List} from "@material-ui/core";
import Item from './Item';
import format from 'date-fns/format'
import {withContext} from "../../context";
import {inject, observer} from "mobx-react";
import {Button, Grid, Header, List, Pagination} from "semantic-ui-react";
import Filters from "./Filters";
import LoadingComponent from "../../Layouts/LoadingComponent";
import {Protected} from "../../Common/auth/Protected";

@Protected
@withContext
@inject('activityStore')
@observer
class Activities extends Component {
    componentDidMount() {
        this.props.activityStore.loadActivities();
    }
    
    componentDidUpdate(prevProps, ps, sn) {
        if (this.props !== prevProps) {
            this.props.activityStore.loadActivities();
        }
    }
    
    handleSetPage = (page) => {
        this.props.activityStore.setPage(page);
        this.props.activityStore.loadActivities();
    };

    handlePaginationChange = (e, {activePage}) => {
        console.log(activePage);
        this.props.activityStore.setPage(activePage);
        this.props.activityStore.loadActivities();
    };

    render() {
        const {
            activityStore: {
                activitiesByDateFromStore,
                selectActivity,
                page,
                totalPagesCount,
                loading
            }
        } = this.props;

        return (
            <Grid>
                <Grid.Column width={10}>
                    {loading &&
                        
                        <Fragment>
                            <Header sub color={'teal'} content={'Activities loading...'}/>
                            <LoadingComponent inverted={true} content={'Loading activities'} />
                        </Fragment>
                    }
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
                    <Pagination
                        activePage={page}
                        totalPages={totalPagesCount}
                        onPageChange={this.handlePaginationChange}
                    />
                </Grid.Column>
                <Filters/>
            </Grid>
        )
    }
}

export default Activities;