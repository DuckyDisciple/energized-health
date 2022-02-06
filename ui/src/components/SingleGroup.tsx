import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import { DataSection, SubSection, SectionColumns } from 'components/DataSection'
import { List, ListItem } from 'components/List'
import { AddUserModal } from 'components/AddUserModal'
import { NavLink } from 'react-router-dom'
import { Loader } from 'components'
import { AddGroupModal } from './AddGroupModal'
import { OpenModalButton } from './Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export const GET_GROUP = gql`
  query group($_id: ID!) {
    getGroup(groupId: $_id) {
      _id
      name
      description
      users {
        _id
        name
      }
      subgroups {
        _id
        name
      }
      parent {
        _id
        name
      }
    }
  }
`

export const SingleGroup = ({ groupId, clearLoading }) => {
  const [isAddingUsers, setIsAddingUsers] = useState(false)
  const [isAddingGroups, setIsAddingGroups] = useState(false)

  const { data } = useQuery(GET_GROUP, { variables: { _id: groupId } })

  useEffect(() => {
    if (data) {
      clearLoading()
    }
  }, [data])

  if (!data) {
    return <Loader mini={false} />
  }

  return (
    <DataSection>
      {data.getGroup.parent && (
        <NavLink to={`/dashboard/groups/${data.getGroup.parent._id}`}>
          <ParentButton>
            <FontAwesomeIcon icon={faChevronLeft} /> {data.getGroup.parent.name}
          </ParentButton>
        </NavLink>
      )}
      <h3>{data.getGroup.name}</h3>
      <p>{data.getGroup.description}</p>
      <SectionColumns>
        <SubSection>
          <h5>Users</h5>
          {data.getGroup.users.length > 0 ? (
            <List>
              {data.getGroup.users.map((user) => {
                return (
                  <ListItem key={user._id}>
                    <NavLink to={`/dashboard/users/${user._id}`}>{user.name}</NavLink>
                  </ListItem>
                )
              })}
            </List>
          ) : (
            <p>No users in this group</p>
          )}
          {isAddingUsers ? (
            <AddUserModal closeModal={() => setIsAddingUsers(false)} groupId={groupId} />
          ) : (
            <OpenModalButton onClick={() => setIsAddingUsers(true)}>Add Users</OpenModalButton>
          )}
        </SubSection>
        <SubSection>
          <h5>Sub Groups</h5>
          {data.getGroup.subgroups.length > 0 ? (
            <List>
              {data.getGroup.subgroups
                .slice()
                .sort((a, b) => {
                  return a.name.localeCompare(b.name)
                })
                .map((subgroup) => {
                  return (
                    <ListItem key={subgroup._id}>
                      <NavLink to={`/dashboard/groups/${subgroup._id}`}>{subgroup.name}</NavLink>
                    </ListItem>
                  )
                })}
            </List>
          ) : (
            <p>No subgroups in this group</p>
          )}
          {isAddingGroups ? (
            <AddGroupModal closeModal={() => setIsAddingGroups(false)} groupId={groupId} />
          ) : (
            <OpenModalButton onClick={() => setIsAddingGroups(true)}>Add Groups</OpenModalButton>
          )}
        </SubSection>
      </SectionColumns>
    </DataSection>
  )
}

const ParentButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  text-transform: uppercase;
  transition: 0.3s ease-out;
  margin-bottom: 0.5rem;

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    color: ${({ theme }) => theme.primary};
    opacity: 1;
  }
`
