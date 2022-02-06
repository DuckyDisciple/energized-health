import React, { useContext } from 'react'
import styled from 'styled-components'
import { AuthContext, AuthTypes } from 'context'
import { Dropdown } from 'components'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'js-cookie'

export function Profile() {
  const { dispatch: authDispatch } = useContext(AuthContext)

  const avatarIcon = () => {
    return (
      <AvatarPlaceholder>
        <FontAwesomeIcon icon={faUser} />
      </AvatarPlaceholder>
    )
  }

  const logout = () => {
    Cookies.remove('token')
    authDispatch({ type: AuthTypes.Logoff })
  }

  return (
    <ProfileWrapper>
      <Dropdown
        menuIcon={avatarIcon()}
        renderMenuItems={() => (
          <>
            <NavLink className="profile-link" to="/dashboard/user/settings" aria-label="Profile">
              Profile
            </NavLink>
            <a onClick={logout}>Logout</a>
          </>
        )}
      />
    </ProfileWrapper>
  )
}

const ProfileWrapper = styled.div`
  padding-left: 20px;
  border-left: solid 1px ${(props) => props.theme.outline};
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text};
  z-index: 100;
`

const AvatarPlaceholder = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: solid 1px ${(props) => props.theme.outline};
  background: ${(props) => props.theme.grayBackground};
  overflow: hidden;

  svg {
    font-size: 2.1rem;
    padding-top: 0.55rem;
  }
`
