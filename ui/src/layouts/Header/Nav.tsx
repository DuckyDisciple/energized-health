import React, { useState } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Login, Profile } from 'components'
import { Modal } from 'components/Modal'

export function Nav({ isLoggedIn = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const closeModal = () => {
    setIsModalOpen(false)
  }
  const openModal = () => {
    setIsModalOpen(true)
  }

  const NavBar = (
    <>
      <LoginButton onClick={openModal}>Login</LoginButton>
      <Modal isActive={isModalOpen} closeAction={closeModal}>
        <Login />
      </Modal>
    </>
  )

  const UserNavBar = (
    <>
      <div className="user-nav">
        <NavLink className="dashboard-nav-link" to="/dashboard/tracking" aria-label="Tracking">
          Tracking
        </NavLink>
      </div>
      <Profile />
    </>
  )

  return (
    <>
      <NavWrapper className=" header__nav flex" $isLoggedIn={isLoggedIn}>
        {/* {isLoggedIn ? <LogoutButton/> : <LoginButton />} */}
        {isLoggedIn ? UserNavBar : NavBar}
      </NavWrapper>
      {/* {isLoggedIn && <UserMenu user={{}} />} */}
    </>
  )
}

const NavWrapper = styled.nav`
  ${({ $isLoggedIn }) =>
    $isLoggedIn &&
    `justify-content: flex-end;
  `};
  .contact-button {
    margin-left: var(--smallSpace);
  }
  .user-nav {
    margin-right: var(--space);
    > * + * {
      margin-left: var(--space);
    }
  }

  button,
  a {
    color: ${({ theme }) => theme.dark};
    transition: 0.3s ease-out;

    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`
const LoginButton = styled.div`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  padding: 0.25rem 1rem;
  border-radius: 5px;
  border: solid 2px ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: 0.3s ease-out;

  &:hover {
    background: transparent;
    color: ${({ theme }) => theme.primary};
  }
`
