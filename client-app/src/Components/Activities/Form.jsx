import React, {Component} from 'react';
import {DialogContent, FormControl, InputLabel, MenuItem, Select, TextField, withStyles} from "@material-ui/core";

const styles = theme => ({
    formControl: {
        width: 500
    }
});

const categories = [
    'drinks', 'food', 'music', 'culture'
];

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
            activity: {
                ...this.state.activity,
                [name]: value
            }
        })
    };

    handleSubmit = () => {
        //TODO: validation
        const {activity} = this.state;
        console.log(activity);

        this.props.onCreate({
            ...activity,
            id: activity.title.toLocaleLowerCase().replace(/ /g, '-')
        })
    };
    
    render() {
        const {title, description, category, date, city, venue} = this.state;
        const {classes} = this.props;
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
                    value={date}
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
            </form>
        )
    }
})