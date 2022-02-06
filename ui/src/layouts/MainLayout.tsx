import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from '../pages'
import NotFoundPage from '../pages/404'
import ContactPage from '../pages/contact'
import DashboardLayout from './DashboardLayout'

const SiteLayout = () => {
  return (
    <main id="main">
      <Switch>
        {/* Static Pages */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/contact" component={ContactPage} />
        <Route path="/dashboard" component={DashboardLayout} />
        {/* <Route exact path="/privacy" component={PrivacyPage} />
          <Route exact path="/terms" component={TermsPage} /> */}
        {/* Layouts */}
        {/* <Route path="/dashboard" component={DashboardLayout} /> */}
        {/* 404 Page */}
        <Route component={NotFoundPage} />
      </Switch>
    </main>
  )
}

export default SiteLayout
