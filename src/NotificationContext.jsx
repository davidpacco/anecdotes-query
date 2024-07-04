import { createContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.payload
    case 'REMOVE_MESSAGE':
      return null
  }
}

export const NotificationContext = createContext()

export function NotificationProvider({ children }) {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  return (
    < NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}