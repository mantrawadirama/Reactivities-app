import React, { Fragment, useContext, useEffect } from 'react'
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
import { RootStoreContext } from '../stores/rootStore'
import { LoadingComponent } from '../components/layouts/LoadingComponent'
import ModalContainer from '../components/modals/ModalContainer'
import ProfilePage from '../components/profiles/ProfilePage'
import PrivateRoute from '../components/layouts/PrivateRoute'

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext)
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore
  const { getUser } = rootStore.userStore

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded())
    } else {
      setAppLoaded()
    }
  }, [getUser, setAppLoaded, token])

  if (!appLoaded) return <LoadingComponent content='Loading App' />
  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <PrivateRoute
                  exact
                  path='/activities'
                  component={ActivityDashboard}
                />
                <PrivateRoute
                  exact
                  path='/activities/:id'
                  component={ActivityDetails}
                />
                <PrivateRoute
                  key={location.key}
                  exact
                  path={['/createactivity', '/manage/:id']}
                  component={ActivityForm}
                />
                <PrivateRoute
                  path='/profile/:username'
                  component={ProfilePage}
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
