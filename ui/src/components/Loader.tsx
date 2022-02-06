import React from 'react'
import styled, { keyframes } from 'styled-components'

const wave = keyframes`
0%, 40%, 100% {
    transform: translateY(0);
}
20% {
    transform: translateY(-0.5rem);
}
`

const LoaderStyle = styled.div`
  margin: ${(props) => (props.mini ? '0' : '3rem 0')};
  font-size: ${(props) => (props.mini ? '0.75rem' : '1.3rem')};
  letter-spacing: ${(props) => (props.mini ? '1px' : '2px')};
  & span {
    animation: ${wave} 1.5s ease-in-out infinite;
    display: inline-block;
    &:nth-child(1) {
      animation-delay: 0;
    }
    &:nth-child(2) {
      animation-delay: 100ms;
    }
    &:nth-child(3) {
      animation-delay: 200ms;
    }
  }
`

interface LoaderProps {
  mini?: boolean
  text?: string
}

export const Loader = ({ mini = false, text = 'Loading' }: LoaderProps) => {
  return (
    <LoaderStyle mini={mini}>
      {text}
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </LoaderStyle>
  )
}
