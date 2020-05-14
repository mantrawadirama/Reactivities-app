import React, { useState, FormEvent } from 'react'
import { Segment, Form, Button, Icon } from 'semantic-ui-react'
import { IActivity } from '../../../models/activity'
import { v4 as uuid } from 'uuid'
interface IProps {
  activity: IActivity | null
  setEditMode: (editMode: boolean) => void
  createActivity: (activity: IActivity) => void
  editActivity: (activity: IActivity) => void
}
export const ActivityForm: React.FC<IProps> = ({
  activity: initialFormState,
  setEditMode,
  createActivity,
  editActivity,
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState
    } else {
      return {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
      }
    }
  }
  const [activity, setActivity] = useState<IActivity>(initializeForm)
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget
    setActivity({
      ...activity,
      [name]: value,
    })
  }
  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = { ...activity, id: uuid() }
      createActivity(newActivity)
    } else {
      editActivity(activity)
    }
    console.log(activity)
  }
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name='title'
          placeholder='Title'
          value={activity.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name='description'
          rows={2}
          placeholder='Description'
          value={activity.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name='category'
          placeholder='Category'
          value={activity.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name='date'
          type='datetime-local'
          placeholder='Date'
          value={activity.date}
        />
        <Form.Input
          onChange={handleInputChange}
          name='city'
          placeholder='City'
          value={activity.city}
        />
        <Form.Input
          onChange={handleInputChange}
          name='venue'
          placeholder='Venue'
          value={activity.venue}></Form.Input>

        <Button
          icon
          labelPosition='right'
          positive
          type='submit'
          floated='right'>
          <Icon name='save' />
          Submit
        </Button>
        <Button
          icon
          labelPosition='right'
          onClick={() => setEditMode(false)}
          floated='right'>
          <Icon name='cancel' />
          Cancel
        </Button>
      </Form>
    </Segment>
  )
}
