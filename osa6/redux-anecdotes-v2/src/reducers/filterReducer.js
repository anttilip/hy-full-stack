const filterReducer = (state = '', action) => {
  switch (action.type) {
  case 'MODIFY_FILTER':
    return action.value
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
