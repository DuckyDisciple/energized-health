import React, { useContext } from 'react'
import styled from 'styled-components'
import { AuthContext } from 'context'
import { useQuery, gql } from '@apollo/client'
import { DataSection } from 'components/DataSection'
import { Loader } from 'components'
import { PageWrapper } from 'components/PageWrapper'

const GET_ME = gql`
  query GetMe {
    me {
      username
      email
      displayName
      defaultWaterGoal
      defaultSupplementJsons
    }
  }
`

export default function ProfilePage() {
  const { state: authState } = useContext(AuthContext)
  const { data: meData, loading: meLoading, error: meError } = useQuery(GET_ME)

  if (meLoading) {
    return <Loader />
  }

  const formatSupplementJson = (json) => {
    const { name, unit } = JSON.parse(json)
    return (
      <>
        <span>{name}</span>
        <span>{unit}</span>
      </>
    )
  }

  return (
    <PageWrapper>
      {authState.isLoggedIn && (
        <div>
          {meError && <div>{meError.message}</div>}
          {meData && (
            <>
              <NameLine>
                <MetaColumn>
                  <h2>{meData?.me?.displayName}</h2>
                  {meData?.me?.username && <p>{meData?.me?.username}</p>}
                </MetaColumn>
              </NameLine>
              <DataSection>
                <h3>Email</h3>
                <p>{meData?.me?.email}</p>
                <h3>Default Water</h3>
                <p>{meData?.me?.defaultWaterGoal}</p>
                <h3>Default Supplement</h3>
                <ul>
                  {meData?.me?.defaultSupplementJsons.map((supplement) => (
                    <li key={supplement}>{formatSupplementJson(supplement)}</li>
                  ))}
                </ul>
              </DataSection>
            </>
          )}
        </div>
      )}
    </PageWrapper>
  )
}

const NameLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    margin: 0;
  }
`
const MetaColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  p {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 0;
  }
`
