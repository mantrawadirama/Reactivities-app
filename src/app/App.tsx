import React, { Fragment } from 'react'
import { Container } from 'semantic-ui-react'
import {
  NavBar,
  HomePage,
  ActivityDashboard,
  ActivityDetails,
  ActivityForm,
} from '../components'
import { observer } from 'mobx-react-lite'
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch,
} from 'react-router-dom'
import NotFound from '../components/layouts/NotFound'
import { ToastContainer } from 'react-toastify'

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route exact path='/activities' component={ActivityDashboard} />
                <Route
                  exact
                  path='/activities/:id'
                  component={ActivityDetails}
                />
                <Route
                  key={location.key}
                  exact
                  path={['/createactivity', '/manage/:id']}
                  component={ActivityForm}
                />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  )
}
export default withRouter(observer(App))
