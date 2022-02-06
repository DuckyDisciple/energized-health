import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { Modal } from 'components/Modal'
import { Loader } from 'components'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { gql, useMutation } from '@apollo/client'
import { GET_GROUP } from 'components/SingleGroup'
import { GET_GROUPS } from 'components/GroupList'

const CREATE_SUBGROUP = gql`
  mutation createSubgroup($name: String!, $description: String, $parent: ID!) {
    createSubgroup(name: $name, description: $description, parent: $parent) {
      _id
      name
    }
  }
`

const CREATE_GROUP = gql`
  mutation createGroup($name: String!, $description: String) {
    createGroup(name: $name, description: $description) {
      _id
      name
    }
  }
`

interface GroupValues {
  name: string
  description: string
}

type Props = {
  closeModal: Dispatch<SetStateAction<boolean>>
  groupId?: string
}

export const AddGroupModal = ({ closeModal, groupId }: Props) => {
  const [createSubgroup, { loading: subLoading, error: subError, data: subData }] = useMutation(CREATE_SUBGROUP, {
    refetchQueries: [{ query: GET_GROUP, variables: { _id: groupId } }],
  })
  const [createGroup, { loading: groupLoading, error: groupError, data: groupData }] = useMutation(CREATE_GROUP, {
    refetchQueries: [{ query: GET_GROUPS }],
  })

  const validateName = (value) => {
    let error
    if (!value) {
      error = 'Required'
    }
    return error
  }

  return (
    <Modal onClose={closeModal}>
      <h4>Create Group</h4>
      {subLoading || groupLoading ? (
        <Loader />
      ) : subData ? (
        <p>{subData.createSubgroup.name} created</p>
      ) : subError ? (
        <p>{subError.message}</p>
      ) : groupData ? (
        <p>{groupData.createGroup.name} created</p>
      ) : groupError ? (
        <p>{groupError.message}</p>
      ) : (
        <AddGroupForm>
          <Formik
            initialValues={{
              name: '',
              description: '',
            }}
            onSubmit={(values: GroupValues, { setSubmitting }: FormikHelpers<GroupValues>) => {
              if (groupId) {
                createSubgroup({
                  variables: { name: values.name, description: values.description, parent: groupId },
                })
              } else {
                createGroup({
                  variables: { name: values.name, description: values.description },
                })
              }
              setTimeout(() => {
                setSubmitting(false)
              }, 1000)
            }}
          >
            {({ errors, touched, isSubmitting, submitForm }) => (
              <Form>
                <Field name="name" placeholder="Name" validate={validateName} />
                {errors.name && touched.name && <ErrorMsg>{errors.name}</ErrorMsg>}
                <Field as="textarea" name="description" placeholder="Description" />
                <button type="submit" disabled={isSubmitting} onClick={submitForm}>
                  {groupId ? 'Create Subgroup' : 'Create Group'}
                </button>
              </Form>
            )}
          </Formik>
        </AddGroupForm>
      )}
    </Modal>
  )
}

const ErrorMsg = styled.div`
  margin: -0.5rem 0 0.5rem;
  color: red;
  font-size: 0.6rem;
`

const AddGroupForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 20rem;

  form {
    width: 100%;
  }

  input {
    margin-bottom: 0.5rem;
    width: 100%;
  }

  button {
    background: ${({ theme }) => theme.primary};
    padding: 0.25rem 1rem;
    border-radius: 10px;
    color: ${({ theme }) => theme.white};
    border: solid 1px ${({ theme }) => theme.primary};
    transition: 0.3s ease-out;
    text-align: center;
    margin: 0 auto;
    display: block;
    text-transform: uppercase;

    &:hover {
      background: ${({ theme }) => theme.background};
      color: ${({ theme }) => theme.primary};
    }
  }
`
