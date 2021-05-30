import React, {useEffect, useState} from 'react'
import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Logo } from 'components'
import { useAuth, Types } from 'global'
import { Nav } from './Nav'
import { MobileMenu } from './MobileMenu'
import { SubNav } from './SubNav'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useHistory, useLocation } from 'react-router-dom'

const ME = gql`
  query GetMe {
    me {
      displayName
      username
      isAdmin
    }
  }
`

export function Header() {
  const { state, dispatch } = useAuth()
  const history = useHistory()
  const location = useLocation()
  const [isCredsChecked, setIsCredsChecked] = useState(false)

  const { data: credsOnServer } = useQuery(ME, {
    fetchPolicy: 'no-cache',
  })
  
  // Check if user is logged in
  useEffect(() => {
    if (!isCredsChecked && credsOnServer && credsOnServer.me && credsOnServer.me.displayName) {
      dispatch({
        type: Types.Login,
        payload: {
          displayName: credsOnServer.me.displayName,
          username: credsOnServer.me.username,
          isAdmin: credsOnServer.me.isAdmin,
        },
      })
      setIsCredsChecked(true)
      
      // Redirect to Dashboard if at home
      if(location.pathname = "/") {
        history.push("/dashboard")
      }
    }
  }, [credsOnServer, isCredsChecked, dispatch])

  return (
    <>
      <HeaderWrapper className="header flex" $isLoggedIn={state.isLoggedIn}>
        <div className="header__inner wrapper">
          <h1 className="margin-0 logo">
            <NavLink data-testid="logo-link" to={state.isLoggedIn ? '/dashboard' : '/'} aria-label="home page">
              <Logo isDark={state.isLoggedIn} />
            </NavLink>
          </h1>
          <Nav isLoggedIn={state.isLoggedIn} />
          {!state.isLoggedIn && <MobileMenu />}
        </div>
      </HeaderWrapper>
      {state.isLoggedIn && <SubNav />}
    </>
  )
}

const HeaderWrapper = styled.header`
  --headerBg: transparent;
  background: var(--headerBg);
  top: 0;
  width: 100%;

  // height: var(--headerHeight);
  z-index: var(--headerLevel);
  position: absolute;
  ${({ $isLoggedIn }) =>
    $isLoggedIn &&
    css`
      border-bottom: var(--line);
      --headerBg: var(--white);
      position: relative;
    `};

  .header__inner {
    position: relative;
    padding: 0 var(--space);
    margin: 0 auto;
    height: 100%;
    width: 100%;
    display: flex;
    .header__nav {
      flex-grow: 2;
      .dropdown {
        position: relative;
        display: inline-block;
      }
      .dropdown-menu {
        position: absolute;
        left: var(--space);
        display: none;
        width: 230px;
        background-color: var(--white);
        border-radius: var(--cardRadius);
        padding: var(--smallSpace);
        z-index: 1;
        animation: growDown 340ms ease-in-out forwards;
        .triangle {
          width: 0;
          height: 0;
          position: absolute;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid white;
          top: -5px;
          left: 18%;
          margin-left: -8px;
        }
        .nav-link {
          color: var(--textColor);
          margin-left: 0;
        }
      }
      .dropdown:hover .dropdown-menu {
        display: block;
      }
      .nav-link {
        color: var(--white);
        margin-left: var(--space);
      }
    }
  }
  .menu-icon {
    outline: none;
    display: none;
  }

  @media (max-width: 880px) {
    .header__inner {
      justify-content: space-between;
      .logo {
        margin-top: 6px;
      }
      .menu-icon {
        display: block;
      }
      .header__nav {
        display: none;
      }
    }
  }

  @keyframes growDown {
    0% {
      transform: scaleY(0);
    }
    80% {
      transform: scaleY(1.1);
    }
    100% {
      transform: scaleY(1);
    }
  }
`
