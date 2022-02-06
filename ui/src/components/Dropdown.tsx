import React from 'react'
import styled from 'styled-components'
import { useState, useRef, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useClickOutside } from 'hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHamburger } from '@fortawesome/free-solid-svg-icons'

export const Dropdown = ({ renderMenuItems, style = {}, menuIcon = '' }: DropdownProps) => {
  const [isMenuToggled, setIsMenuToggled] = useState(false)
  const toggle = () => setIsMenuToggled(!isMenuToggled)
  const ref = useRef<HTMLDivElement>(null!)

  useClickOutside(ref, () => setIsMenuToggled(false))

  return (
    <MenuDropdownWrapper data-testid="dropdown-menu" ref={ref} style={style}>
      <MenuIcon data-testid="menu-icon" onClick={toggle}>
        {menuIcon || <FontAwesomeIcon icon={faHamburger} />}
      </MenuIcon>
      <AnimatePresence>
        {isMenuToggled && (
          <MenuDropdownContainer
            style={{
              pointerEvents: isMenuToggled ? 'all' : 'none',
              transformOrigin: 'top center',
            }}
            exit={{ opacity: 0, scaleY: 0.9 }}
            animate={{ opacity: 1, scaleY: 1.0 }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.1 }}
            initial={{ opacity: 0, scaleY: 0.9 }}
          >
            {renderMenuItems(toggle)}
          </MenuDropdownContainer>
        )}
      </AnimatePresence>
    </MenuDropdownWrapper>
  )
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Types
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
interface DropdownProps {
  renderMenuItems(arg: () => void): ReactNode
  style?: object
  menuIcon?: ReactNode
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Styles
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const MenuDropdownWrapper = styled.div`
  /* margin-left: var(--space); */
  perspective: 400px;
  display: flex;
  justify-content: flex-end;
  z-index: 100;
`

const MenuDropdownContainer = styled(motion.div)`
  position: absolute;
  top: 100%;
  background: ${(props) => props.theme.pageBackground};
  border-radius: 5px;
  padding: 10px;
  right: 0;
  min-width: 150px;
  text-align: center;
  z-index: 5;
  box-shadow: 0 2px 4px -3px ${(props) => props.theme.shadow};
  display: flex;
  flex-direction: column;

  & > a,
  & > button {
    cursor: pointer;
    padding: 3px;
    transition: 0.3s ease-out;

    &:hover {
      background: ${({ theme }) => theme.tintBackground};
      color: ${({ theme }) => (theme.name === 'light' ? theme.primary : theme.lightBlue)};
    }
  }
`

const MenuIcon = styled.button`
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`
