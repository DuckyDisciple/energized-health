import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export function Avatar({ photoSrc = null, size = 25, style = {} }: Props) {
  return (
    <AvatarContainer data-testid="avatar-container" data-component="avatar" size={size} style={style}>
      {photoSrc ? (
        <img data-testid="avatar-image" loading="lazy" src={photoSrc} alt="User photo avatar" />
      ) : (
        <FontAwesomeIcon icon={faUser} />
      )}
    </AvatarContainer>
  )
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Types
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
type Props = {
  photoSrc?: string | null
  size?: number
  style?: {}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Styles
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const AvatarContainer = styled.div<{ size?: number }>`
  ${({ size }) => `--size: ${size}px;`};
  width: var(--size);
  min-width: var(--size);
  height: var(--size);
  line-height: var(--size);
  border-radius: var(--size);
  text-align: center;
  overflow: hidden;
  position: relative;
  background: var(--primaryColor);

  svg {
    width: 100%;
    height: auto;
  }

  img {
    width: 100%;
    height: auto;
  }
`
