// import store from '../store'
// import { createNotification } from './notificationReducer'
import { getId, asObject } from './utils'

const initialAnecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const initialState = {
  list: initialAnecdotes.map(asObject),
  visible: initialAnecdotes.map(asObject)
}

const anecdoteReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'VOTE_ANECDOTE': {
    const old = state.list.filter(a => a.id !== action.anecdote.id)
    const voted = state.list.find(a => a.id === action.anecdote.id)
    const updatedAnecdotes = [...old, { ...voted, votes: voted.votes+1} ]
    return {
      ...state,
      list: updatedAnecdotes,
      visible: updatedAnecdotes
    }
  }
  case 'CREATE_ANECDOTE': {
    const updatedAnecdotes = [...state.list, { content: action.content, id: getId(), votes: 0 }]
    return {
      ...state,
      list: updatedAnecdotes,
      visible: updatedAnecdotes
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


const createAnecdote = content => ({
  type: 'CREATE_ANECDOTE',
  content
})

const voteAnecdote = anecdote => ({
  type: 'VOTE_ANECDOTE',
  anecdote
})

export {
  createAnecdote,
  voteAnecdote,
}
