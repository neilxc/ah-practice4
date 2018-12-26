import React, {Component, Fragment} from 'react';
import ActivityListItem from "./ActivityListItem";

class ActivityList extends Component {
    render() {
        const {activities} = this.props;
        return (
            <Fragment>
                {activities && activities.map(activity => (
                    <ActivityListItem
                        key={activity.id}
                        activity={activity}
                    />
                ))}
            </Fragment>
        );
    }
}

export default ActivityList;