import React from 'react'
import { Item, Label, Segment, Icon } from 'semantic-ui-react'
import { IActivity } from '../../../models/activity'

interface IProps {
  activities: IActivity[]
  selectActivity: (id: string) => void
  deleteActivity: (id: string) => void
}
export const ActivityList: React.FC<IProps> = ({
  activities,
  selectActivity,
  deleteActivity,
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
                <span className='spanRight'>
                  <Icon
                    size='large'
                    color='blue'
                    onClick={() => selectActivity(activity.id)}
                    name='eye'
                  />
                </span>
                <span className='spanRight'>
                  <Icon
                    onClick={() => deleteActivity(activity.id)}
                    size='large'
                    color='red'
                    name='trash alternate'
                  />
                </span>

                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  )
}
