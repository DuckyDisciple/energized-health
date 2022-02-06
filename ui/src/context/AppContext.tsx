import React, { createContext, useReducer } from 'react'
import theme from '../styles/Themes'

const initialState: InitialStateType = {
  currentTheme: theme.light,
  hasNewNotification: false,
  hasNewMessage: false,
  notifications: [],
  messages: [],
}

const AppContext = createContext<{
  state: InitialStateType
  dispatch: React.Dispatch<AppActions>
}>({ state: initialState, dispatch: () => null })

const reducer = (state: InitialStateType, action: AppActions) => {
  switch (action.type) {
    case AppTypes.ToggleTheme:
      return {
        ...state,
        currentTheme: state.currentTheme.name === 'light' ? theme.dark : theme.light,
      }
    case AppTypes.SetNotifications:
      return {
        ...state,
        notifications: action.payload.notifications,
      }
    case AppTypes.SetNewNotifications:
      return {
        ...state,
        hasNewNotification: action.payload.hasNew,
      }
    case AppTypes.SetNewMessages:
      return {
        ...state,
        hasNewMessage: action.payload.hasNew,
      }
    case AppTypes.SetMessages:
      return {
        ...state,
        messages: action.payload.messages,
      }
    default:
      return state
  }
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export { AppContext, AppProvider }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Types
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
type InitialStateType = {
  currentTheme: any
  hasNewNotification: boolean
  hasNewMessage: boolean
  notifications: [Notification?]
  messages: [Message?]
}

export type Notification = {
  text: string
}

export type Message = {
  image: string
  from: string
  text: string
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

export enum AppTypes {
  ToggleTheme = 'TOGGLE_THEME',
  SetNotifications = 'SET_NOTIFICATIONS',
  SetNewNotifications = 'SET_NEW_NOTIFICATIONS',
  SetMessages = 'SET_MESSAGES',
  SetNewMessages = 'SET_NEW_MESSAGES',
}

type AppPayLoad = {
  [AppTypes.ToggleTheme]: {}
  [AppTypes.SetNotifications]: {
    notifications: [Notification?]
  }
  [AppTypes.SetNewNotifications]: {
    hasNew: boolean
  }
  [AppTypes.SetMessages]: {
    messages: [Message?]
  }
  [AppTypes.SetNewMessages]: {
    hasNew: boolean
  }
}

export type AppActions = ActionMap<AppPayLoad>[keyof ActionMap<AppPayLoad>]
