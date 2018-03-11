import * as api from '../services/api'
import { getId, asObject } from './utils'

const initialAnecdotes = []

const initialState = {
  list: initialAnecdotes.map(asObject),
  visible: initialAnecdotes.map(asObject)
}

const anecdoteReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'ADD_ANECDOTES': {
    return {
      ...state,
      list: action.anecdotes,
      visible: action.anecdotes
    }
  }
  case 'MODIFY_FILTER': {
    const visible = state.list.filter(a => a.content.includes(action.value))
    return {...state, visible}
  }
  default:
    return state
  }
}

export default anecdoteReducer

const addAnecdotes = (anecdotes) => ({
  type: 'ADD_ANECDOTES',
  anecdotes
})

const updateAnecdote = (anecdote) => ({
  type: 'UPDATE_ANECDOTE',
  anecdote
})

const fetchAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await api.fetchAllAnecdotes()
    return dispatch(addAnecdotes(anecdotes))
  }
}

const voteAnecdote = (anecdote) => {
  anecdote.votes++
  return async (dispatch) => {
    dispatch({ type: 'VOTE_ANECDOTE', anecdote })
    const updatedAnecdote = await api.voteAnecdote(anecdote)
    dispatch(fetchAnecdotes())
  }
}

const createAnecdote = (content) => {
  const anecdote = {content, id: getId(), votes: 0}
  return async (dispatch) => {
    dispatch({ type: 'CREATE_ANECDOTE', content })
    const updatedAnecdote = await api.saveAnecdote(anecdote)
    dispatch(fetchAnecdotes())
  }
}


export {
  createAnecdote,
  voteAnecdote,
  fetchAnecdotes
}
