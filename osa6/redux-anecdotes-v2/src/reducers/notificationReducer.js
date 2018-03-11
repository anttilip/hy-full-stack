const notificationReducer = (state = 'Initial notification', action) => {
  switch(action.type) {
  case 'CREATE_NOTIFICATION':
    return action.notification
  default:
    return state
  }
}

export default notificationReducer

const createNotification = (content) => ({
  type: 'CREATE_NOTIFICATION',
  notification: content
})

export {
  createNotification,
}
