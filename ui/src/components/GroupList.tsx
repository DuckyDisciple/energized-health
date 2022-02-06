import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { NavLink } from 'react-router-dom'
import { DataSection } from 'components/DataSection'
import { List, ListItem } from 'components/List'
import { OpenModalButton } from 'components/Modal'
import { Loader } from 'components'
import { AddGroupModal } from 'components/AddGroupModal'

export const GET_GROUPS = gql`
  query groups {
    allGroups {
      _id
      name
    }
  }
`

export const GroupList = () => {
  const [isAddingGroup, setIsAddingGroup] = useState(false)

  const { data } = useQuery(GET_GROUPS)

  if (!data) {
    return <Loader mini={false} />
  }

  return (
    <DataSection>
      <h3>Groups</h3>
      <List>
        {data.allGroups.map((group) => {
          return (
            <ListItem key={group._id}>
              <NavLink to={`/dashboard/groups/${group._id}`}>{group.name}</NavLink>
            </ListItem>
          )
        })}
      </List>
      {isAddingGroup ? (
        <AddGroupModal closeModal={setIsAddingGroup} />
      ) : (
        <OpenModalButton onClick={() => setIsAddingGroup(true)}>Add Group</OpenModalButton>
      )}
    </DataSection>
  )
}
