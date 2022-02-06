import React, { useContext } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Nav } from './Nav'
import { AuthContext } from 'context'

export function Header() {
  const { state: authState } = useContext(AuthContext)
  // Check if user is logged in
  return (
    <>
      <HeaderWrapper className="header" $isLoggedIn={authState.isLoggedIn}>
        <NavLink data-testid="logo-link" to={authState.isLoggedIn ? `/dashboard/` : '/'} aria-label="home page">
          <div>EH</div>
          {/* <HeaderLogo src={MainDark} alt="logo" /> */}
        </NavLink>

        <Nav isLoggedIn={authState.isLoggedIn} />
      </HeaderWrapper>
    </>
  )
}

const HeaderWrapper = styled.header`
  background: ${({ theme }) => theme.tintBackground};
  top: 0;
  width: 100%;

  // height: var(--headerHeight);
  z-index: var(--headerLevel);
  position: absolute;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
`
const HeaderLogo = styled.img`
  height: 4rem;
  width: auto;
`
