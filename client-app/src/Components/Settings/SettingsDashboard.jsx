import React from 'react';
import {Grid} from "semantic-ui-react";
import { Switch, Route, Redirect } from 'react-router-dom';
import Basic from "./Basic";
import AboutPage from "./AboutPage";
import PhotosPage from "./PhotosPage";
import AccountPage from "./AccountPage";
import SettingsNav from "./SettingsNav";

const SettingsDashboard = (props) =>
    <Grid>
       <Grid.Column width={12}>
           <Switch>
               <Redirect exact from="/settings" to="/settings/basic" />
               <Route path="/settings/basic" render={() => <Basic />} />
               <Route path="/settings/about" render={() => <AboutPage />} />
               <Route path="/settings/photos" component={PhotosPage} />
               <Route
                   path="/settings/account"
                   render={() => <AccountPage />}
               />
           </Switch>
       </Grid.Column> 
        <Grid.Column width={4}>
            <SettingsNav/>
        </Grid.Column>
    </Grid>;
    
    export default SettingsDashboard;