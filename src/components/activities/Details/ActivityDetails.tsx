import React, { useContext } from 'react'
import { Card, Image, Button, Icon } from 'semantic-ui-react'

import { observer } from 'mobx-react-lite'
import ActivityStore from '../../../stores/activityStore'

const ActivityDetails: React.FC = () => {
  const activityStore = useContext(ActivityStore)
  const {
    selectedActivity: activity,
    openEditForm,
    cancelSelectedActivity,
  } = activityStore
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            style={{ marginRight: '10px' }}
            onClick={() => openEditForm(activity!.id)}
            icon
            labelPosition='right'>
            <Icon name='edit' /> Edit
          </Button>
          <Button
            icon
            labelPosition='right'
            onClick={cancelSelectedActivity}
            floated='right'>
            <Icon name='cancel' />
            Cancel
          </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  )
}

export default observer(ActivityDetails)
