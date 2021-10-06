import React, { useState } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Logo, Modal, Button } from 'components'
import { useAuth } from 'global'
import { LoginModal } from '../Login/LoginModal'

export function Footer() {
  const { state, dispatch } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <FooterWrapper isLoggedIn={state.isLoggedIn}>
        {!state.isLoggedIn && (
          <div className="wrapper">
            <div className="footer__nav container flex">
              <div className="footer__logo">
                <NavLink data-testid="logo-link" to="/" aria-label="home page">
                  <Logo isWhite />
                </NavLink>
              </div>
              <div>
                <NavLink className="text-white" to="/about" aria-label="About page">
                  About
                </NavLink>
                <NavLink className="text-white" to="/services" aria-label="Services page">
                  Services
                </NavLink>
              </div>
              <div>
                <NavLink className="text-white" to="/menus" aria-label="Digital Menus page">
                  Digital Menus
                </NavLink>
                <NavLink className="text-white" to="/sites" aria-label="Website Templates page">
                  Website Templates
                </NavLink>
              </div>
              <NavLink className="text-white" to="/contact" aria-label="Contact page">
                Contact Us
              </NavLink>
              <div>
                <Button color="white" className="footer-button">
                  Join
                </Button>
                <Button color="ghost" className="footer-button" onClick={openModal}>
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className="footer__bottom">
          <div className="wrapper">
            <div className="flex container">
              <span>&copy; {new Date().getFullYear()} Pure Func LLC</span>
              {/* <div>
              <NavLink to="/terms" aria-label="Terms & Conditions page">
                Terms & Conditions
              </NavLink>
              <NavLink to="/privacy" aria-label="Privacy Policy Page">
                Privacy Policy
              </NavLink>
            </div> */}
              {state.isLoggedIn && <Logo isShort style={{ opacity: 0.5 }} />}
              <a href="mailto:support@purefunc.io">Support: support@purefunc.io</a>
            </div>
          </div>
        </div>
      </FooterWrapper>
      <Modal isActive={isModalOpen} closeAction={closeModal}>
        <LoginModal />
      </Modal>
    </>
  )
}

const FooterWrapper = styled.footer`
  margin-top: auto;
  color: var(--footerColor);
  background: var(--purpleGradient);
  .footer__nav {
    @media (max-width: 600px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      .footer-button {
        margin-top: var(--smallSpace);
      }
    }
    a {
      display: block;
      & + a {
        margin-top: var(--space);
      }
    }
    .footer-button + .footer-button {
      margin: var(--smallSpace) 0;
      display: block;
    }
    @media (max-width: 600px) {
      a {
        margin-top: var(--space);
      }
    }
  }
  .footer__bottom {
    .flex {
      @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        span {
          order: 2;
        }
      }
    }
    ${({ isLoggedIn }: { isLoggedIn: boolean }) =>
      `background: ${isLoggedIn ? 'var(--backgroundColor)' : 'var(--deepPurple)'}`};
    color: var(--gray);
    font-size: var(--smallestText);
    a {
      color: var(--gray);

      display: block;
      & + a {
        margin-left: var(--space);
      }
    }
  }
`
