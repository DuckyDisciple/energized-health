import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Header } from './Header'
import { Footer } from './Footer'
import MainLayout from './MainLayout'
import { useScrollToTop } from 'hooks'
import { AppContext, AppProvider, AuthContext, AuthProvider } from 'context'

const App = () => {
  useScrollToTop()
  return (
    <AppProvider>
      <AppContext.Consumer>
        {({ state: appState }) => (
          <AuthProvider>
            <ThemeProvider theme={appState.currentTheme}>
              <Switch>
                <Route path="/" component={AppLayout} />
                <Route component={NoMatch} />
              </Switch>
            </ThemeProvider>
          </AuthProvider>
        )}
      </AppContext.Consumer>
    </AppProvider>
  )
}

const NoMatch = () => null

const AppLayout = () => (
  <>
    <a className="skip-link" href="#main">
      Skip to content
    </a>
    <div id="layout-wrapper">
      <Header />
      <MainLayout />
      <Footer />
    </div>
  </>
)

export default App
