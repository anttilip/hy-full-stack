const backendUrl = 'http://localhost:3001'
const fetchAllAnecdotes = async () => {
  const response = await fetch(`${backendUrl}/anecdotes`)
  return response.json()
}

const saveAnecdote = async (anecdote) => {
  const response = await fetch(`${backendUrl}/anecdotes`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(anecdote)
  })

  return response.json()
}

const voteAnecdote = async (anecdote) => {
  const response = await fetch(`${backendUrl}/anecdotes/${anecdote.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(anecdote)
  })

  return response.json()
}

export {
  fetchAllAnecdotes,
  saveAnecdote,
  voteAnecdote
}
