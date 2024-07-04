const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.payload
    case 'REMOVE_MESSAGE':
      return null
  }
}

export const setNotification = message => {
  return {
    type: 'SET_MESSAGE',
    payload: message
  }
}

export const removeNotification = () => {
  return { type: 'REMOVE_MESSAGE' }
}

export default notificationReducer