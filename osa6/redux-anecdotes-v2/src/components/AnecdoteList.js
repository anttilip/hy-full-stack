/* eslint-disable */
import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import Filter from './Filter'
/* eslint-enable */

class AnecdoteList extends React.Component {
  render() {
    const anecdotes = this.props.anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store} />
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => 
                this.props.voteAnecdote(anecdote)
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  anecdotes: state.anecdotes.visible
})

const mapDispatchToProps = {
  voteAnecdote
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
