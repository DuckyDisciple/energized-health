import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import DashboardHomePage from '../pages/dashboard/home'
import ProfilePage from '../pages/dashboard/profile'
import TrackingPage from '../pages/dashboard/tracking'

// TODO: Add routing for stuff like user settings, menu manager, site template manager etc. Also make sure this cant be hit unless a user is logged in
const DashboardLayout = () => (
  <Switch>
    <Route exact path="/dashboard" component={DashboardHomePage} />
    <Route exact path="/dashboard/tracking" component={TrackingPage} />
    <Route exact path="/dashboard/profile" component={ProfilePage} />
    <Route render={() => <Redirect to="/dashboard" />} />
  </Switch>
)

export default DashboardLayout
