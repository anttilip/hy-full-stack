import { getId, asObject } from './utils'

const initialAnecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
].map(asObject)

const anecdoteReducer = (state = initialAnecdotes, action) => {
  if (action.type==='VOTE') {
    const old = state.filter(a => a.id !== action.id)
    const voted = state.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1} ]
  }
  if (action.type === 'CREATE') {
    return [...state, { content: action.content, id: getId(), votes:0 }]
  }

  return state
}

export default anecdoteReducer


const createAnecdote = content => ({
  type: 'CREATE',
  content
})

const voteAnecdote = anecdote => ({
  type: 'VOTE',
  id: anecdote.id 
})

export {
  createAnecdote,
  voteAnecdote,
}
