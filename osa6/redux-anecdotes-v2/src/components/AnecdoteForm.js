import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

class AnecdoteForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.createAnecdote(content)
  
    e.target.anecdote.value = ''
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  createAnecdote
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
