import React, {Component} from 'react';
import {Form, Button, Grid, Segment, Header} from "semantic-ui-react";
import {inject, observer} from "mobx-react";
import TextInput from "../../Common/form/inputs/TextInput";
import SelectInput from "../../Common/form/inputs/SelectInput";
import DateInput from "../../Common/form/inputs/DateInput";
import {Link, withRouter} from "react-router-dom";
import {toast} from "react-toastify";
import MobxReactFormDevTools from 'mobx-react-form-devtools';
import forms from '../../Common/form/forms';
import {toJS} from "mobx";
import MobxReactForm from 'mobx-react-form';
import SubmitButton from "../../Common/form/controls/SubmitButton";

MobxReactFormDevTools.open(false);

// render the component



@withRouter
@inject('activityStore', 'commonStore')
@observer
class ActivityForm extends Component {
   
    componentWillMount() {
        this.initializeForm().then(() => console.log('form initialized'));
        console.log(this.props.form);
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
            const {attendees, comments, geoCoordinate, host, ...formValues} = activityClone;
            form.init(formValues);  
        } else {
            console.log('clearing form');
            this.props.activityStore.clearActivity();
            form.clear();
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
        if (this.props.commonStore.asyncLoading > 0 || !this.props.commonStore.appLoaded) return <p>Loading...</p>;
        const {
            form,
            activityStore: {
                activity
            },
        } = this.props;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <Segment>
                        <Header sub color={'teal'} content={'Activity Details'}/>
                        <Form>
                            <TextInput field={form.$('title')}/>
                            <TextInput field={form.$('description')}/>
                            <SelectInput field={form.$('category')}/>
                            <DateInput field={form.$('date')}/>
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
                    <MobxReactFormDevTools.UI />
                </Grid.Column>
            </Grid>

        )
    }
}

export default ActivityForm;