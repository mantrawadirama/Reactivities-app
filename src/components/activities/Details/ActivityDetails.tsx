import React, { useContext, useEffect } from 'react'
import { Card, Image, Button, Icon } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import ActivityStore from '../../../stores/activityStore'
import { RouteComponentProps, Link } from 'react-router-dom'
import { LoadingComponent } from '../../layouts/LoadingComponent'

interface DetailParams {
  id: string
}
const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore)
  const { activity, loadActivity, loadingInitial } = activityStore

  useEffect(() => {
    loadActivity(match.params.id)
  }, [loadActivity, match.params.id])

  if (loadingInitial || !activity)
    return <LoadingComponent content='Loading activity' />
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
            as={Link}
            to={`/manage/${activity.id}`}
            icon
            labelPosition='right'>
            <Icon name='edit' /> Edit
          </Button>
          <Button
            icon
            labelPosition='right'
            onClick={() => history.push('/activities')}
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
