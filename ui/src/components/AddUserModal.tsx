import React, { useState } from 'react'
import styled from 'styled-components'
import { Modal } from 'components/Modal'
import { Loader } from 'components'
import { Formik, Field, Form } from 'formik'
import { useQuery, gql, useMutation } from '@apollo/client'
import { GET_GROUP } from 'components/SingleGroup'

const GET_ALL_USERS = gql`
  query allUsers {
    allUsers {
      _id
      name
      user_id
    }
  }
`

const ADD_USERS_TO_GROUP = gql`
  mutation addUsersToGroup($userIds: [ID!], $groupId: ID!) {
    addUsersToGroup(userIds: $userIds, groupId: $groupId)
  }
`

const CREATE_USER = gql`
  mutation createUser($input: UserInput!, $group: ID) {
    createUser(input: $input, group: $group) {
      _id
      name
    }
  }
`

export const AddUserModal = ({ closeModal, groupId }) => {
  const [isCreatingUser, setIsCreatingUser] = useState(false)
  const [isCreatingAnother, setIsCreatingAnother] = useState(false)
  const [userIds, setUserIds] = useState<string[]>([])

  const { data: allUsersData, loading: allUsersLoading, error: allUsersError } = useQuery(GET_ALL_USERS)
  const [addUsersToGroup, { loading: addLoading, error: addError, data: addData }] = useMutation(ADD_USERS_TO_GROUP, {
    refetchQueries: [{ query: GET_GROUP, variables: { _id: groupId } }],
  })
  const [createUser, { loading: newUserLoading, error: newUserError, data: newUserData }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_GROUP, variables: { _id: groupId } }],
  })

  const handleAddUsers = () => {
    addUsersToGroup({ variables: { userIds, groupId: groupId } })
  }

  const toggleAddUser = (userId) => {
    if (userIds.includes(userId)) {
      setUserIds(userIds.filter((id) => id !== userId))
    } else {
      setUserIds([...userIds, userId])
    }
  }

  const validateName = (value) => {
    let error

    if (!value) {
      error = 'Required'
    }

    return error
  }

  const formReset = () => {
    setIsCreatingUser(true)
    setIsCreatingAnother(true)
  }

  return (
    <Modal onClose={closeModal}>
      <h4>Add Users</h4>
      {allUsersLoading || addLoading || newUserLoading ? (
        <Loader />
      ) : addData ? (
        <p>{addData.addUsersToGroup} added</p>
      ) : newUserData && !isCreatingAnother ? (
        <>
          <p>{newUserData.createUser.name} added</p>
          <SwitchLink onClick={formReset}>Create Another User</SwitchLink>
        </>
      ) : addError ? (
        <p>{addError.message}</p>
      ) : newUserError ? (
        <p>{newUserError.message}</p>
      ) : allUsersError ? (
        <p>{allUsersError.message}</p>
      ) : (
        <AddUserForm>
          {isCreatingUser ? (
            <>
              <Formik
                initialValues={{ given_name: '', family_name: '', email: '' }}
                onSubmit={(values, { setSubmitting }) => {
                  createUser({
                    variables: {
                      input: { given_name: values.given_name, family_name: values.family_name, email: values.email },
                      group: groupId,
                    },
                  })
                  setTimeout(() => {
                    setIsCreatingAnother(false)
                    setSubmitting(false)
                  }, 1000)
                }}
              >
                {({ errors, touched, isSubmitting, submitForm }) => (
                  <Form>
                    <Field name="given_name" type="text" placeholder="First Name" validate={validateName} />
                    {errors.given_name && touched.given_name && <ErrorMsg>{errors.given_name}</ErrorMsg>}
                    <Field name="family_name" type="text" placeholder="Last Name" validate={validateName} />
                    {errors.family_name && touched.family_name && <ErrorMsg>{errors.family_name}</ErrorMsg>}
                    <Field name="email" type="email" placeholder="Email" />
                    <button type="submit" disabled={isSubmitting} onClick={submitForm}>
                      Create User
                    </button>
                  </Form>
                )}
              </Formik>
              <SwitchLink onClick={() => setIsCreatingUser(false)}>Add Existing Users</SwitchLink>
            </>
          ) : (
            <>
              {allUsersData?.allUsers.length > 0 ? (
                <>
                  <AddUserList>
                    {allUsersData.allUsers.map((user) => {
                      return (
                        <AddUserItem
                          key={user._id}
                          active={userIds.includes(user.user_id)}
                          onClick={() => toggleAddUser(user.user_id)}
                        >
                          {user.name}
                        </AddUserItem>
                      )
                    })}
                  </AddUserList>
                  <button onClick={handleAddUsers}>Add Users</button>
                </>
              ) : (
                <p>No users to add</p>
              )}
              <SwitchLink onClick={() => setIsCreatingUser(true)}>Create New User</SwitchLink>
            </>
          )}
        </AddUserForm>
      )}
    </Modal>
  )
}

const AddUserForm = styled.div`
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

const AddUserList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
  width: 100%;
  border: solid 1px ${({ theme }) => theme.outline};
  border-radius: 5px;
  max-height: 20rem;
  overflow-y: auto;
  padding: 0.25rem;
`

const AddUserItem = styled.li`
  padding: 0.5rem 1rem;
  background: ${({ theme, active }) => (active ? theme.primary : theme.background)};
  transition: 0.3s ease-out;
  color: ${({ theme, active }) => (active ? theme.white : theme.text)};
  cursor: pointer;
  width: 100%;

  &:hover {
    background: ${({ theme, active }) => (active ? theme.darkenedPrimary : theme.tintBackground)};
  }
`

const SwitchLink = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  margin-top: 1rem;
  text-align: center;
  transition: 0.3s ease-out;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`

const ErrorMsg = styled.div`
  margin: -0.5rem 0 0.5rem;
  color: red;
  font-size: 0.6rem;
`
