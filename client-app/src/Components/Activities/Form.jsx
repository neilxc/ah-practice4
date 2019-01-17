import React, {Component} from 'react';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    withStyles,
    Input,
    Button
} from "@material-ui/core";
import format from 'date-fns/format';
import {inject, observer} from "mobx-react";
import * as Utils from '../../Common/utils';

const styles = theme => ({
    formControl: {
        width: 500
    }
});

@withStyles(styles)
@inject('activityStore')
@observer
class Form extends Component {
    state = this.getInitState();

    getInitState() {
        const {activity} = this.props.activityStore;

        return activity ? activity : {
            title: '',
            description: '',
            category: '',
            date: '',
            city: '',
            venue: '',
        }
    }

    handleChange = name => ({target: {value}}) => {
        this.setState({
            ...this.state.activity,
            [name]: value
        });
    };

    handleSubmit = () => {
        if (this.props.activityStore.activity) {
            this.props.activityStore.updateActivity(this.state);
        } else {
            this.props.activityStore.addActivity({
                id: Utils.uuid(),
                attendees: [
                    {
                        "username": "bob",
                        "dateJoined": "2019-02-04T14:00",
                        "image": null,
                        "isHost": true  
                    }
                ],
                ...this.state
            });
        }
    };
    
    render() {
        const {title, description, category, date, city, venue} = this.state;
        const {classes, activityStore: {
            cancelEditActivity, 
            activity, 
            categories
            }
        } = this.props;
        return (
            <form>
                <TextField
                    label="Title"
                    value={title}
                    onChange={this.handleChange('title')}
                    margin="normal"
                    className={classes.formControl}
                />
                <br/>
                <TextField
                    label="Description"
                    multiline
                    rows={4}
                    value={description}
                    onChange={this.handleChange('description')}
                    margin="normal"
                    className={classes.formControl}
                />
                <br/>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="categories">
                        Category
                    </InputLabel>
                    <Select
                        value={category}
                        onChange={this.handleChange('category')}
                        input={<Input name={'category'} />}
                    >
                        {categories.map((category) =>
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
                <br/>
                <TextField
                    label="Date"
                    value={date && format(date, "yyyy-MM-dd'T'H:mm")}
                    type={'datetime-local'}
                    onChange={this.handleChange('date')}
                    margin="normal"
                    className={classes.formControl}
                />
                <br/>
                <TextField
                    label="City"
                    value={city}
                    onChange={this.handleChange('city')}
                    margin="normal"
                    className={classes.formControl}
                />
                <br/>
                <TextField
                    label="Venue"
                    value={venue}
                    onChange={this.handleChange('venue')}
                    margin="normal"
                    className={classes.formControl}
                />
                <br/>
                <Button
                    color="primary"
                    variant={'contained'}
                    onClick={this.handleSubmit}
                >
                    {activity ? 'Edit' : 'Create'}
                </Button>
                <Button
                    color="secondary"
                    variant={'contained'}
                    onClick={cancelEditActivity}
                >
                    Cancel
                </Button>
            </form>
        )
    }
}

export default Form;