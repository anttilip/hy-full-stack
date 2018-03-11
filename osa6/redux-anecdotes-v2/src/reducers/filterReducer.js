const filterReducer = (state = '', action) => {
  switch (action.type) {
  case 'MODIFY_FILTER':
    return action.value
  case 'CREATE_ANECDOTE':
    return ''
  case 'VOTE_ANECDOTE':
    return ''
  default:
    return state
  }
}

export default filterReducer

const modifyFilter = value => ({
  type: 'MODIFY_FILTER',
  value
})

export {
  modifyFilter,
}
