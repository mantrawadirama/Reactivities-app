import React, {
  useState,
  useEffect,
  Fragment,
  SyntheticEvent,
  useContext,
} from 'react'
import { Container } from 'semantic-ui-react'
import { NavBar } from '../components/layouts/NavBar'
import { IActivity } from '../models/activity'
import { ActivityDashboard } from '../components/activities/dashboard/ActivityDashboard'
import ActivityService from '../service/ActivityService'
import { LoadingComponent } from '../components/layouts/LoadingComponent'
import ActivityStore from '../stores/activityStore'

const App = () => {
  const activityStore = useContext(ActivityStore)

  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  )
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [target, setTarget] = useState('')

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter((i) => i.id === id)[0])
    setEditMode(false)
  }
  const handleOpenCreateForm = () => {
    setSelectedActivity(null)
    setEditMode(true)
  }
  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true)
    ActivityService.Operations.create(activity)
      .then(() => {
        setActivities([...activities, activity])
        setSelectedActivity(activity)
        setEditMode(false)
      })
      .then(() => setSubmitting(false))
  }
  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true)
    ActivityService.Operations.update(activity)
      .then(() => {
        setActivities([
          ...activities.filter((a) => a.id !== activity.id),
          activity,
        ])
        setSelectedActivity(activity)
        setEditMode(false)
      })
      .then(() => setSubmitting(false))
  }
  const handleDeleteActivity = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setSubmitting(true)
    setTarget(event.currentTarget.name)
    ActivityService.Operations.delete(id)
      .then(() => {
        setActivities([...activities.filter((a) => a.id !== id)])
      })
      .then(() => setSubmitting(false))
  }
  useEffect(() => {
    ActivityService.Operations.list()
      .then((response) => {
        let activities: IActivity[] = []
        response.forEach((activity) => {
          activity.date = activity.date.split('.')[0]
          activities.push(activity)
        })

        setActivities(activities)
      })
      .then(() => setLoading(false))
  }, [])

  if (loading) return <LoadingComponent content={'Loading Activities ...'} />
  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <h2>{activityStore.title}</h2>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  )
}
export default App
