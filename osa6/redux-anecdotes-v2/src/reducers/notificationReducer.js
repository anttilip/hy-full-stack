import store from '../store'

const notificationReducer = (state = 'Initial notification', action) => {
  switch(action.type) {
  case 'CREATE_NOTIFICATION':
    return action.notification
  case 'CLEAR_NOTIFICATION':
    return null
  case 'VOTE_ANECDOTE':
    clearNotificationTimeout()
    return `You voted '${action.anecdote.content}'`
  case 'CREATE_ANECDOTE':
    clearNotificationTimeout()
    return `You created '${action.content}'`
  default:
    return state
  }
}

export default notificationReducer

const clearNotificationTimeout = (timeout = 5) => {
  setTimeout(() => {
    store.dispatch(clearNotification())
  }, timeout * 1000)
} 

const clearNotification = () => ({
  type: 'CLEAR_NOTIFICATION'
})
