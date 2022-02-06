import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { AuthContext, AuthTypes } from 'context'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router'

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: ${(props) => props.theme.smallBreakpoint}) {
    margin-top: -0.5rem;
  }
`

const Input = styled.input`
  padding: 0.2rem 0.5rem;
  margin: 0 0 0.1rem;
`

const Button = styled.input`
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.white};
  border: solid 1px transparent;
  padding: 0.2rem 1rem;
  transition: 0.3s ease-out all;
  cursor: pointer;

  &:hover {
    background: transparent;
    color: ${(props) => props.theme.primary};
    border: solid 1px ${(props) => props.theme.primary};
  }
`

const LoginError = styled.div`
  color: ${(props) => props.theme.primary};
  font-size: 0.5rem;
`

const ME = gql`
  query GetMe {
    me {
      displayName
      username
      email
      role
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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isCredsChecked, setIsCredsChecked] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const { dispatch: authDispatch } = useContext(AuthContext)

  const { data: credsOnServer } = useQuery(ME, {
    fetchPolicy: 'no-cache',
  })
  const [login, { data: loginData, loading: loginLoading, error: loginError }] = useMutation(LOGIN, {
    variables: {
      password,
      username,
    },
    fetchPolicy: 'no-cache',
  })

  // Redirect to home
  useEffect(() => {
    if (window.location.pathname !== '/') {
      setIsRedirecting(true)
    }
  }, [])

  // Check if user is logged in
  useEffect(() => {
    if (!isCredsChecked && credsOnServer && credsOnServer.me && credsOnServer.me.displayName) {
      console.log('Logged in', credsOnServer.me)
      authDispatch({
        type: AuthTypes.Login,
        payload: {
          displayName: credsOnServer.me.displayName,
          email: credsOnServer.me.email,
          username: credsOnServer.me.username,
          role: credsOnServer.me.role,
        },
      })
      setIsCredsChecked(true)
    }
  }, [credsOnServer, isCredsChecked, authDispatch])

  // Authenticate from Login
  useEffect(() => {
    if (loginData && loginData.login) {
      Cookies.set('token', loginData.login.token)
      console.log('Logged in', loginData.login.token)
      authDispatch({
        type: AuthTypes.Login,
        payload: {
          displayName: loginData.login.user.displayName,
          email: loginData.login.user.email,
          username: loginData.login.user.username,
          role: loginData.login.user.role,
        },
      })
    }
  }, [loginData, authDispatch])

  return (
    <>
      {isRedirecting ? (
        <Redirect to="/" push={true} />
      ) : (
        <LoginForm
          onSubmit={(e) => {
            e.preventDefault()
            login()
          }}
        >
          <Input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" value={loginLoading ? 'Loading...' : 'Login'} />
          {loginError && <LoginError>{loginError.message}</LoginError>}
        </LoginForm>
      )}
    </>
  )
}
