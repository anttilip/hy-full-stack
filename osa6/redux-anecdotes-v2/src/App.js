/* eslint-disable */
import React from 'react'
import { connect } from 'react-redux'
import { fetchAnecdotes } from './reducers/anecdoteReducer'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
/* eslint-enable */

class App extends React.Component {
  componentDidMount() {
    this.props.fetchAnecdotes()
  }

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}

const mapDispatchToProps = {
  fetchAnecdotes
}

export default connect(
  null,
  mapDispatchToProps
)(App)
