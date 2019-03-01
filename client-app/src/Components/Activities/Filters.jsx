import React, {Component} from 'react';
import {Header, Grid, Menu} from "semantic-ui-react";
import {inject, observer} from "mobx-react";
import { Calendar } from 'react-widgets'

@inject('activityStore', 'authStore')
@observer
class Filters extends Component{
    state = {
        activeItem: 'all'
    };

    handleDateChange = (date) => {
        this.setState({activeItem: null});
        this.props.activityStore.setPredicate({startDate: date.toISOString()});
    };

    handleItemClick = (e, {name}) => {
        console.log(name);
        this.setState({activeItem: name});
        if (name === 'username' || name === 'host') {
            this.props.activityStore.setPredicate({[name]: this.props.authStore.currentUser.username})
        } else {
            this.props.activityStore.setPredicate({[name]: true});
        }
    };

    render() {
        const {activeItem} = this.state;
        return (
            <Grid.Column width={4}>
                <Menu vertical size={'large'} style={{width: '100%', marginTop: 30}}>
                    <Header icon={'filter'} attached color={'teal'} content={'Filters'}/>
                    <Menu.Item
                        active={activeItem === 'all'}
                        onClick={this.handleItemClick}
                        color={'blue'}
                        name={'all'}
                        content={'All Activities'}
                    />
                    <Menu.Item
                        active={activeItem === 'username'}
                        onClick={this.handleItemClick}
                        color={'blue'}
                        name={'username'}
                        content={"I'm Going"}
                    />
                    <Menu.Item
                        active={activeItem === 'host'}
                        onClick={this.handleItemClick}
                        color={'blue'}
                        name={'host'}
                        content={"I'm hosting"}
                    />
                </Menu>
                <Header icon={'calendar'} attached color={'teal'} content={'Select Date'}/>
                <Calendar onChange={this.handleDateChange}/>
            </Grid.Column>
        )
    }
}

export default Filters;