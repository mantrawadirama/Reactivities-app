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
import { Route, withRouter, RouteComponentProps } from 'react-router-dom'

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/activities' component={ActivityDashboard} />
              <Route exact path='/activities/:id' component={ActivityDetails} />
              <Route
                key={location.key}
                exact
                path={['/createactivity', '/manage/:id']}
                component={ActivityForm}
              />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  )
}
export default withRouter(observer(App))
