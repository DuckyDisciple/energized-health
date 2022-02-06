import React from 'react'
import styled from 'styled-components'

const ListStyle = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
  background: ${({ theme }) => theme.background};
  max-height: 10rem;
  overflow-y: auto;
`
export const List = ({ children }) => {
  return <ListStyle>{children}</ListStyle>
}

const ListItemStyle = styled.li`
  a {
    padding: 0rem 0.5rem;
    display: block;
    transition: 0.3s ease-out;
    color: ${({ theme }) => theme.text};

    &:hover {
      color: ${({ theme }) => theme.white};
      background: ${({ theme }) => theme.primary};
    }
  }
`
export const ListItem = ({ children }) => {
  return <ListItemStyle>{children}</ListItemStyle>
}
