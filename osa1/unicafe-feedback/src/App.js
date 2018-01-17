import React, { Component } from 'react';
import './App.css';
import Feedback from './Feedback'
import Statistics from './Statistics'

const Stat = (name) => ({
  name: name,
  votes: 0,
})

class App extends Component {
  constructor() {
    super()

    this.state = {
      stats: [
       Stat('hyvä'),
       Stat('neutraali'),
       Stat('huono'),
      ]
    }
  }

  addVote(statToAdd) {
    const stats = this.state.stats
    stats.forEach(stat => {
      if (stat.name === statToAdd.name) {
        stat.votes++
      }
    })

    this.setState({ stats: stats })
  }

  render() {
    return (
      <div className="App">
        <h1>Unicafe Feedback App!</h1>
        <Feedback stats={this.state.stats} onFeedback={stat => this.addVote(stat)} />
        <Statistics stats={this.state.stats} />
      </div>
    );
  }
}

export default App;
