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
import { LoginForm } from '../components/user/LoginForm'
import { RootStoreContext } from '../stores/rootStore'
import { LoadingComponent } from '../components/layouts/LoadingComponent'
import ModalContainer from '../components/modals/ModalContainer'

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
                <Route path='/login' component={LoginForm} />
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
