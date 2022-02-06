import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { Portal } from './Portal'
import { useScrollFreeze } from '../hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

interface ModalAnimationProps {
  isActive: boolean
  maxWidth?: string
  children: ReactNode
  closeAction?: () => void
}

export function Modal({ isActive, children, maxWidth = `530px`, closeAction }: ModalAnimationProps) {
  return (
    <Portal>
      <AnimatePresence>
        {isActive && (
          <ModalContent children={children} maxWidth={maxWidth} closeAction={closeAction} isActive={isActive} />
        )}
      </AnimatePresence>
    </Portal>
  )
}

const ModalContent = ({ isActive, children, maxWidth, closeAction }: ModalAnimationProps) => {
  useScrollFreeze()
  const pointerEvents = isActive ? `all` : `none`
  return (
    <>
      <ModalWrapper>
        <motion.div
          className="modal__transport"
          style={{ maxWidth }}
          exit={{ opacity: 0, y: -40 }}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="modal__card" style={{ pointerEvents }} data-testid="modal">
            {closeAction && (
              <button className="modal__close-button" onClick={closeAction}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
            <div>{children}</div>
          </div>
        </motion.div>
      </ModalWrapper>
      <Background
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={closeAction || null}
      />
    </>
  )
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  overflow-y: scroll;
  padding: var(--space);
  pointer-events: none;
  z-index: var(--highestLevel);
  .modal__card {
    --modalPadding: calc(var(--space) / 2);
    padding: var(--modalPadding);
    border-radius: var(--cardRadius);
    background: var(--white);
    box-shadow: var(--elevation-5);
    & > div {
      padding: 0 var(--modalPadding) var(--modalPadding) var(--modalPadding);
      & > *:first-child {
        margin-top: 0;
      }
      & > *:last-child {
        margin-bottom: 0;
      }
    }
  }
  .modal__close-button {
    pointer-events: all;
    z-index: 1;
  }
  .modal__transport {
    position: relative;
    width: 100%;
    margin-top: auto;
    margin-bottom: auto;
    min-width: 320px;
  }
`

const Background = styled(motion.div)`
  background: rgba(50, 50, 93, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: all;
  width: 100vw;
  height: 100vh;
  z-index: calc(var(--highestLevel) - 1);
  cursor: pointer;
`
