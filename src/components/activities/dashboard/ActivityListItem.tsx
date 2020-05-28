import React from 'react'
import { Item, Icon, Button, Segment, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { IActivity } from '../../../models/activity'
import { observer } from 'mobx-react-lite'
import { format } from 'date-fns'
import { ActivityListItemAttendee } from './ActivityListItemAttendee'
interface IProps {
  activity: IActivity
}
const ActivityListItem: React.FC<IProps> = ({ activity }) => {
  const host = activity.attendees.filter((x) => x.isHost)[0]
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size='tiny'
              circular
              src={host.image || '/assets/user.png'}
            />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>Hosted by {host.displayName}</Item.Description>
              {activity.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color='orange'
                    content='You are hosting this activity'
                  />
                </Item.Description>
              )}
              {activity.isGoing && !activity.isHost && (
                <Item.Description>
                  <Label
                    basic
                    color='green'
                    content='You are going to this activity'
                  />
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name='clock' /> {format(activity.date, 'h:mm a')}
        <Icon name='marker' />
        {activity.venue},{activity.city}
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendee attendees={activity.attendees} />
      </Segment>
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
