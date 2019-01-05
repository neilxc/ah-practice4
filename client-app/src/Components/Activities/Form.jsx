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

const styles = theme => ({
    formControl: {
        width: 500
    }
});

export default withStyles(styles)(class extends Component {
    state = this.getInitState();

    getInitState() {
        const {activity} = this.props;

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
        //TODO: validation
        this.props.onSubmit({
            id: this.state.title.toLocaleLowerCase().replace(/ /g, '-'),
            attendees: [
                {
                    "username": "bob",
                    "dateJoined": "2019-02-04T14:00",
                    "image": null,
                    "isHost": true
                }
            ],
            ...this.state,
        });
        
        this.setState(this.getInitState());
    };
    
    renderSelectOptions = () => {
        return this.props.categories.map((dt, i) => (
            <MenuItem key={i} value={dt}>
                {dt}
            </MenuItem>
        ))
    };
    
    render() {
        const {title, description, category, date, city, venue} = this.state;
        const {classes, categories, cancelFormEdit, activity} = this.props;
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
                    // defaultValue={format(new Date(), 'YYYY-MM-DDThh:mm')}
                    value={format(date, 'YYYY-MM-DDThh:mm')}
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
                    onClick={cancelFormEdit}
                >
                    Cancel
                </Button>
            </form>
        )
    }
})