import React, {Component, Fragment} from 'react';
import {Header} from './Layouts';
import Activities from './Components/Activities';

class App extends Component {

    render() {
        return (
            <Fragment>
                <Header/>
                <Activities/>
            </Fragment>
        );
    }
}

export default App;
