import React, { useContext } from 'react'
import { Item, Label, Segment, Icon, Button } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import ActivityStore from '../../../stores/activityStore'

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore)
  const {
    activitiesByDate,
    selectActivity,
    deleteActivity,
    submitting,
    target,
  } = activityStore
  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  icon
                  color='teal'
                  labelPosition='right'
                  floated='right'
                  onClick={() => selectActivity(activity.id)}>
                  <Icon name='eye' />
                  View
                </Button>
                <Button
                  name={activity.id}
                  loading={target === activity.id && submitting}
                  icon
                  color='red'
                  onClick={(e) => deleteActivity(e, activity.id)}
                  labelPosition='right'
                  floated='right'>
                  <Icon name='trash alternate' />
                  Delete
                </Button>

                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  )
}
export default observer(ActivityList)
