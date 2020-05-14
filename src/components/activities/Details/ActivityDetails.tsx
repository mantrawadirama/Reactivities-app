import React from 'react'
import { Card, Image, Button, Icon } from 'semantic-ui-react'
import { IActivity } from '../../../models/activity'

interface IProps {
  activity: IActivity
  setEditMode: (editMode: boolean) => void
  setSelectedActivity: (activity: IActivity | null) => void
}
export const ActivityDetails: React.FC<IProps> = ({
  activity,
  setEditMode,
  setSelectedActivity,
}) => {
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            style={{ marginRight: '10px' }}
            onClick={() => setEditMode(true)}
            icon
            labelPosition='right'>
            <Icon name='edit' /> Edit
          </Button>
          <Button
            icon
            labelPosition='right'
            onClick={() => setSelectedActivity(null)}
            floated='right'>
            <Icon name='cancel' />
            Cancel
          </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  )
}
