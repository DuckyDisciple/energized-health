import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/link-context'
import React from 'react'

import { useAuth0 } from '@auth0/auth0-react'

const AuthorizedApolloProvider = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0()

  const isProd = Boolean(window.location.host.indexOf('dashboard.functionalentertainment.com') > -1)
  const apiUrl = isProd ? 'https://dashboard.functionalentertainment.com/graphql' : 'http://localhost:8000/graphql'

  const httpLink = createHttpLink({
    uri: apiUrl,
    credentials: 'include',
  })

  const authLink = setContext(async () => {
    const token = await getAccessTokenSilently()
    return {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default AuthorizedApolloProvider
