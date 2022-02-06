import React, { useState, useEffect, useContext } from 'react'
import { AuthContext, AuthTypes } from 'context'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router'

import '../header/header.scss'

const ME = gql`
  query GetMe {
    me {
      displayName
      username
      role
      email
    }
  }
`

const LOGIN = gql`
  mutation CheckCreds($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        displayName
        username
        role
        email
      }
      token
    }
  }
`

export const Login = () => {
  const { dispatch: authDispatch } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isCredsChecked, setIsCredsChecked] = useState(false)
  const [isRedirecting] = useState(false)

  const { data: credsOnServer } = useQuery(ME)
  const [login, { data: loginData, loading: loginLoading, error: loginError }] = useMutation(LOGIN, {
    variables: {
      password,
      username,
    },
  })

  // Check if user is logged in
  useEffect(() => {
    if (!isCredsChecked && credsOnServer && credsOnServer.me && credsOnServer.me.displayName) {
      authDispatch({
        type: AuthTypes.Login,
        payload: {
          displayName: credsOnServer.me.displayName,
          username: credsOnServer.me.username,
          role: credsOnServer.me.role,
          email: credsOnServer.me.email,
        },
      })
      setIsCredsChecked(true)
    }
  }, [credsOnServer, isCredsChecked, authDispatch])

  // Authenticate from login
  useEffect(() => {
    if (loginData && loginData.login) {
      Cookies.set('token', loginData.login.token)
      authDispatch({
        type: AuthTypes.Login,
        payload: {
          displayName: loginData.login.user.displayName,
          username: loginData.login.user.username,
          role: loginData.login.user.role,
          email: loginData.login.user.email,
        },
      })
    }
  }, [loginData, authDispatch])

  return (
    <>
      {isRedirecting ? (
        <Redirect to="/" push={true} />
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            login()
          }}
        >
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="cta" type="submit">
            {loginLoading ? 'Loading...' : 'Login'}
          </button>
          {loginError && <span>{loginError.message}</span>}
        </form>
      )}
    </>
  )
}
