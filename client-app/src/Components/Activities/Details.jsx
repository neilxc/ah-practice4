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
import {Close, ExpandMore, MoreVert, Check, Image} from '@material-ui/icons';

const styles = theme => ({
    card: {
        maxWidth: 400,
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

    handleClose = () =>
        this.setState({
            anchorEl: null
        });

    render() {
        const {classes} = this.props;
        const {anchorEl} = this.state;

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar className={classes.avatar}>
                            R
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
                                <MenuItem onClick={this.handleClose}>
                                    Edit
                                </MenuItem>
                            </Menu>
                        </div>

                    }
                    title="Activity Title"
                    subheader="September 14, 2016 at 8:00 PM"
                />
                <CardMedia
                    className={classes.media}
                    image="/assets/categoryImages/drinks.jpg"
                    title="Activity Title"
                />
                <CardContent>
                    <Typography component="p">
                        Event description
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <Typography variant={'button'} style={{marginRight: 10}}>
                        Going?
                    </Typography>
                    <Button variant={'contained'} color={'primary'} style={{marginRight: 5}}>
                        Yes
                        <Check/>
                    </Button>
                    <Button variant={'contained'} color={'secondary'}>
                        No
                        <Close/>
                    </Button>
                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
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
                            <ListItem>
                                <Avatar>
                                    <Image/>
                                </Avatar>
                                <ListItemText primary={'Host Name'}/>
                            </ListItem>
                            <ListItem>
                                <Avatar>
                                    <Image/>
                                </Avatar>
                                <ListItemText primary={'Host Name'}/>
                            </ListItem>
                            <ListItem>
                                <Avatar>
                                    <Image/>
                                </Avatar>
                                <ListItemText primary={'Host Name'}/>
                            </ListItem>
                        </List>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

export default withStyles(styles)(Details);
