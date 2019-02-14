import React, {Component} from 'react';
import {Header, Grid, Menu} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import {inject, observer} from "mobx-react";

@inject('activityStore')
@observer    
class Filters extends Component{
    state = {
        startDate: new Date()
    };
    
    handleDateChange = (date) => {
        this.props.activityStore.setPredicate({startDate: date.toISOString()});
        this.setState({
            startDate: date
        })
    };
    
    render() {
        const {setPredicate} = this.props.activityStore;
        return (
            <Grid.Column width={4}>
                <Menu vertical size={'large'} style={{width: '100%', marginTop: 30}}>
                    <Header icon={'filter'} attached inverted color={'grey'} content={'Filters'}/>
                    <Menu.Item onClick={() => setPredicate({all: true})} name={'allActivities'}>All Activities</Menu.Item>
                    <Menu.Item onClick={() => setPredicate({going: true})} name={'going'}>I'm Going</Menu.Item>
                    <Menu.Item onClick={() => setPredicate({host: true})} name={'hosting'}>I'm Hosting</Menu.Item>
                </Menu>
                <DatePicker
                    dropdownMode={'select'}
                    onChange={this.handleDateChange}
                    selected={this.state.startDate}
                    dateFormat="yyyy/MM/dd"
                    inline
                    todayButton={'Today'}
                    // calendarClassName="custom-date-picker" 
                />
            </Grid.Column>
        )
    }
}

export default Filters;


    