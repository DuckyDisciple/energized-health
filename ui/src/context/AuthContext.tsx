import React, { createContext, useReducer } from 'react'

const initialState: InitialStateType = {
  displayName: undefined,
  username: undefined,
  isLoggedIn: false,
  role: undefined,
  email: undefined,
}

const AuthContext = createContext<{
  state: InitialStateType
  dispatch: React.Dispatch<AuthActions>
}>({ state: initialState, dispatch: () => null })

const reducer = (state, action) => {
  console.log('AuthContext reducer', action)
  switch (action.type) {
    case AuthTypes.Login:
      console.log('LOGIN', action.payload)
      return {
        displayName: action.displayName,
        username: action.username,
        isLoggedIn: true,
        role: action.role,
        email: action.email,
      }
    case AuthTypes.Logoff:
      return initialState
    default:
      return state
  }
}

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
}

const AuthConsumer = AuthContext.Consumer

export { AuthContext, AuthProvider, AuthConsumer }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Types
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
type InitialStateType = {
  displayName?: string
  username?: string
  isLoggedIn: boolean
  role?: string
  email?: string
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export enum AuthTypes {
  Login = 'LOGIN',
  Logoff = 'LOGOFF',
}

type AuthPayLoad = {
  [AuthTypes.Login]: {
    displayName: string
    username: string
    role: string
    email: string
  }
  [AuthTypes.Logoff]
}

export type AuthActions = ActionMap<AuthPayLoad>[keyof ActionMap<AuthPayLoad>]
