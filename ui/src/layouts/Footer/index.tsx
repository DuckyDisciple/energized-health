import React from 'react'
import styled from 'styled-components'

export function Footer() {
  return (
    <>
      <FooterWrapper>
        <div className="footer__bottom">
          <div className="wrapper">
            <div className="flex container">
              <span>&copy; {new Date().getFullYear()} Think Transformation, Inc</span>
              {/* <div>
                <NavLink to="/terms" aria-label="Terms & Conditions page">
                  Terms & Conditions
                </NavLink>
                <NavLink to="/privacy" aria-label="Privacy Policy Page">
                  Privacy Policy
                </NavLink>
              </div> */}
            </div>
          </div>
        </div>
      </FooterWrapper>
    </>
  )
}

const FooterWrapper = styled.footer`
  margin-top: auto;
  color: var(--footerColor);
  background: var(--purpleGradient);
  .footer__nav {
    align-items: flex-start !important;
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
