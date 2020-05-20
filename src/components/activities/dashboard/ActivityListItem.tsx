import React from 'react'
import { Item, Icon, Button, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { IActivity } from '../../../models/activity'
import { observer } from 'mobx-react-lite'

interface IProps {
  activity: IActivity
}
const ActivityListItem: React.FC<IProps> = ({ activity }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src='/assets/user.png' />
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Description>
                <div>{activity.description}</div>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name='clock' /> {activity.date}
        <Icon name='marker' />
        {activity.venue},{activity.city}
      </Segment>
      <Segment secondary>Attendees will go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          icon
          color='blue'
          labelPosition='right'
          floated='right'
          as={Link}
          to={`/activities/${activity.id}`}>
          <Icon name='eye' />
          View
        </Button>
      </Segment>
    </Segment.Group>
  )
}

export default observer(ActivityListItem)
