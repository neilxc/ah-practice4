import React, {Component} from 'react';
import {Form, Button, Grid, Segment, Header} from "semantic-ui-react";
import {inject, observer} from "mobx-react";
import TextInput from "../../Common/form/inputs/TextInput";
import SelectInput from "../../Common/form/inputs/SelectInput";
import {Link, withRouter} from "react-router-dom";
import {toast} from "react-toastify";
import MobxReactFormDevTools from 'mobx-react-form-devtools';
import {toJS} from "mobx";
import SubmitButton from "../../Common/form/controls/SubmitButton";
import WidgetDatePicker from "../../Common/form/inputs/WidgetDatePicker";
import WidgetTimePicker from "../../Common/form/inputs/WidgetTimePicker";
import LoadingComponent from "../../Layouts/LoadingComponent";

MobxReactFormDevTools.open(false);

@withRouter
@inject('activityStore', 'commonStore')
@observer
class ActivityForm extends Component {
   
    componentWillMount() {
        this.initializeForm().then(() => console.log('form initialized'));
    };
    
    componentWillUnmount() {
        this.props.form.clear();
    }

    initializeForm = async () => {
        const {match, form} = this.props;
        const id = match.params && +match.params.id;
        if (id) {
            console.log('have id and retrieving values');
            await this.props.activityStore.loadActivity(id, {acceptCached: true});
            const activityClone = toJS(this.props.activityStore.activity);
            const activityDate = new Date(activityClone.date);
            const time = new Date(activityClone.date);
            const {attendees, comments, geoCoordinate, host, date, ...formValues} = activityClone;
            form.init({...formValues, date: activityDate, time});  
        } else {
            console.log('clearing form');
            this.props.activityStore.clearActivity();
            form.init();
        }
    };

    handleSubmit = async () => {
        const {form} = this.props;
        const {activity} = this.props.activityStore;
        if (activity) {
            const result = await form.submit();
            if (result.hasError) {
                toast.error('The form has an error')
            } else {
                toast.success('Activity Updated');
                this.props.history.push(`/activities/${activity.id}`)
            }
        } else {
            // form.submit();
            form.add({key: 'geoCoordinate', value: {
                    latitude: 2,
                    longitude: 3
                }});
            const result = await form.submit();
            if (result.hasError) {
                toast.error('The form has an error');
            } else {
                toast.success('Activity Created!');
                this.props.history.push(`/activities/${form.$('id').value}`);
            }
        }
    };

    render() {
        const {
            form,
            activityStore: {
                activity,
                loading
            },
        } = this.props;
        return (
            <Grid>
                <Grid.Column width={10}>
                    {loading && 
                        <LoadingComponent inverted={true} content={'Loading activity...'}/>
                    }
                    <Segment>
                        <Header sub color={'teal'} content={'Activity Details'}/>
                        <Form>
                            <TextInput field={form.$('title')}/>
                            <TextInput field={form.$('description')}/>
                            <SelectInput field={form.$('category')}/>
                            {/*<DateInput field={form.$('date')}/>*/}
                            <Form.Group widths={'equal'}>
                                <WidgetDatePicker field={form.$('date')}/>
                                <WidgetTimePicker field={form.$('time')}/>
                            </Form.Group>
                            <Header sub color="teal" content="Activity Location details"/>
                            <TextInput field={form.$('city')}/>
                            <TextInput field={form.$('venue')}/>
                            <SubmitButton form={form} onClick={this.handleSubmit}>
                                {activity ? 'Update' : 'Create'}
                            </SubmitButton>
                            <Button as={Link} to={'/activities'}>
                                Cancel
                            </Button>
                        </Form>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={6}>
                    {/*<MobxReactFormDevTools.UI />*/}
                </Grid.Column>
            </Grid>

        )
    }
}

export default ActivityForm;