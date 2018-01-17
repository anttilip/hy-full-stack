import React from 'react'

const AnecdoteStruc = text => ({
    text: text,
    votes: 0,
  })
  
  const anecdotes = [
    AnecdoteStruc('If it hurts, do it more often'),
    AnecdoteStruc('Adding manpower to a late software project makes it later!'),
    AnecdoteStruc('The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.'),
    AnecdoteStruc('Any fool can write code that a computer can understand. Good programmers write code that humans can understand.'),
    AnecdoteStruc('Premature optimization is the root of all evil.'),
    AnecdoteStruc('Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.')
  ]
  

class AnecdoteContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            anecdotes: anecdotes,
            currentAnecdoteId: this.getRandomAnecId(),
            topVotedAnec: null
        } 
    }

    getRandomAnecId() {
        return Math.floor(Math.random() * Math.floor(anecdotes.length))
    }
    
    onAnecVote(anecToVote) {
        anecdotes.forEach(anec => {
            if (anec.text === anecToVote.text) {
                anec.votes++
                if (!this.state.topVotedAnec || anec.votes > this.state.topVotedAnec.votes) {
                    this.setState({ topVotedAnec: anec })
                }
            }
        })

        this.setState({ anecdotes: anecdotes })
    }

    onNextAnec() {
        this.setState({ currentAnecdoteId: this.getRandomAnecId()}) 
    }

    render() {
        const currentAnec = this.state.anecdotes[this.state.currentAnecdoteId]
        return (
            <div>
                <div>
                    <h2>Anecdote</h2>
                    <p>{currentAnec.text}</p>
                    <p>has {currentAnec.votes} votes</p>
                    <button onClick={() => this.onAnecVote(currentAnec)}>vote</button>
                    <button onClick={() => this.onNextAnec()}>next</button>
                </div>
                <h3>Anecdote with most votes:</h3>
                { this.state.topVotedAnec && (
                    <div>
                        <p>{this.state.topVotedAnec.text}</p>
                        <p>has {this.state.topVotedAnec.votes} votes</p>
                    </div>
                 ) }
            </div>
        )
    }
}

export default AnecdoteContainer