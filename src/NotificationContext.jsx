import { createContext, useReducer } from "react"
import notificationReducer from "./reducers/notificationReducer"

export const NotificationContext = createContext()

export function NotificationProvider({ children }) {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  return (
    < NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}