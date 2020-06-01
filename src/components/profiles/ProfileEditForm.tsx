import React from 'react'
import { observer } from 'mobx-react-lite'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, Button } from 'semantic-ui-react'
import TextInput from '../common/form/TextInput'
import { IProfile } from '../../models/profile'
import { combineValidators, isRequired } from 'revalidate'
import TextAreaInput from '../common/form/TextAreaInput'

const validate = combineValidators({
  displayName: isRequired('displayName'),
})

interface IProps {
  profile: IProfile
  updateProfile: (profile: Partial<IProfile>) => void
}

const ProfileEditForm: React.FC<IProps> = ({ updateProfile, profile }) => {
  return (
    <FinalForm
      onSubmit={updateProfile}
      validate={validate}
      initialValues={profile!}
      render={({ handleSubmit, invalid, pristine, submitting }) => (
        <Form onSubmit={handleSubmit}>
          <Field
            name='displayName'
            placeholder='Display Name'
            value={profile!.displayName}
            component={TextInput}
          />
          <Field
            name='bio'
            placeholder='Bio'
            value={profile!.bio}
            component={TextAreaInput}
          />
          <Button
            positive
            loading={submitting}
            floated='right'
            content='Update Profile'
            disabled={invalid || pristine}
          />
        </Form>
      )}
    />
  )
}

export default observer(ProfileEditForm)
