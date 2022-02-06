import React from 'react'
import styled from 'styled-components'

export const DataSection = ({ children }) => {
  return <DataSectionStyle>{children}</DataSectionStyle>
}

const DataSectionStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: solid 1px ${({ theme }) => theme.outline};
  margin: 1rem auto;
  max-width: 70ch;
  min-width: 50ch;
  border-radius: 10px;
  background: ${({ theme }) => theme.tintBackground};
`

export const SubSection = ({ children }) => {
  return <SubSectionStyle>{children}</SubSectionStyle>
}

const SubSectionStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  border-radius: 10px;
  min-width: 20ch;
  height: 100%;

  h3:first-child,
  h4:first-child,
  h5:first-child,
  h6:first-child {
    border-bottom: solid 1px ${({ theme }) => theme.outline};
  }
`

export const SectionColumns = ({ children }) => {
  return <SectionColumnsStyle>{children}</SectionColumnsStyle>
}

const SectionColumnsStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;

  @media (min-width: ${({ theme }) => theme.mediumBreakpoint}) {
    grid-template-columns: 1fr 1fr;
  }
`
