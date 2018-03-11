import { combineReducers } from 'redux'
import anecdoteReducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
})

export default reducer
