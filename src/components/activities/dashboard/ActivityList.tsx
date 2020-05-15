import React, { SyntheticEvent } from 'react'
import { Item, Label, Segment, Icon, Button } from 'semantic-ui-react'
import { IActivity } from '../../../models/activity'

interface IProps {
  activities: IActivity[]
  selectActivity: (id: string) => void
  deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void
  submitting: boolean
  target: string
}
export const ActivityList: React.FC<IProps> = ({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
  target,
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map((activity) => (
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
