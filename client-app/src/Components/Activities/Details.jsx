import React from 'react';
import {
    withStyles,
    Button,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Collapse,
    Avatar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core';
import classnames from 'classnames';
import red from '@material-ui/core/colors/red';
import {Close, ExpandMore, MoreVert, Check} from '@material-ui/icons';
import format from 'date-fns/format'

const styles = theme => ({
    card: {
        // maxWidth: 600,
        marginTop: 60
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});

class Details extends React.Component {
    state = {
        expanded: false,
        anchorEl: null
    };

    handleExpandClick = () => {
        this.setState(state => ({expanded: !state.expanded}));
    };

    handleVertClick = event =>
        this.setState({
            anchorEl: event.currentTarget
        });
    
    handleEditClick = (id) => {
        this.props.onSelectEdit(id);
        this.handleClose();
    };

    handleClose = () =>
        this.setState({
            anchorEl: null
        });

    render() {
        const {classes, activity, attendActivity, cancelAttendance} = this.props;
        const {attendees} = activity;
        const {anchorEl} = this.state;
        const host = attendees.filter(a => a.isHost === true)[0];
        const going = attendees.filter(a => a.username === "testuser")[0];
        
        if (!host) return <p>Loading...</p>;

        return (
            <Card className={classes.card} style={{position: 'sticky'}}>
                <CardHeader
                    avatar={
                        <Avatar className={classes.avatar} src={host.image}>
                            {host.username.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <div>
                            <IconButton>
                                <MoreVert onClick={this.handleVertClick}/>
                            </IconButton>
                            <Menu 
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                                PaperProps={{
                                    style: {
                                        width: 150,
                                        padding: 0,
                                        left: '30%',
                                        transform: 'translateX(-30%)',
                                    }
                                }}
                            >
                                <MenuItem onClick={() => this.handleEditClick(activity.id)}>
                                    Edit
                                </MenuItem>
                            </Menu>
                        </div>

                    }
                    title={activity.title}
                    subheader={format(activity.date, "MMMM do, yyyy 'at' h:mm a")}
                />
                <CardMedia
                    className={classes.media}
                    image={`/assets/categoryImages/${activity.category}.jpg`}
                    title="Activity Title"
                />
                <CardContent>
                    <Typography component="p">
                        {activity.description}
                    </Typography>
                    <br/>
                    <Typography variant={'h6'}>
                        {going ? 'You are going to this activity' : 'Click below to attend this activity'}
                    </Typography>
                    <Typography variant={'body1'}>
                        {attendees.length} {attendees.length === 1 ? 'person is' : 'people are'} going to this event
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions} >
                    {!going ? <Button 
                        variant={'contained'} 
                        color={'primary'} 
                        style={{marginRight: 5}}
                        onClick={() => attendActivity(activity)}
                    >
                        Sign me up!
                        <Check/>
                    </Button> :
                    <Button 
                        variant={'contained'} 
                        color={'secondary'}
                        onClick={() => cancelAttendance(activity)}
                    >
                        Cancel my place
                        <Close/>
                    </Button>}
                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                    >
                        <ExpandMore/>
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <List>
                            <Typography variant={'subtitle1'}>
                                Attendees
                            </Typography>
                            {activity.attendees.map((attendee) => (
                                <ListItem key={attendee.username}>
                                    <Avatar src={attendee.image}>
                                        {attendee.username.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <ListItemText primary={attendee.username}/>
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

export default withStyles(styles)(Details);
