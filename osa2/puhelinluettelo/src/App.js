import React from 'react'
import personsService from './services/persons'
import List from './List'
import Form from './Form'
import Notification from './Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filterString: '',
      notification: null
    }

    this.addPerson = this.addPerson.bind(this)
  }

  componentWillMount() {
    this.updatePersons()
  }
  
  async updatePersons() {
    const persons = await personsService.getAll()
    this.setState({ persons: persons.data })
  }

  async deletePerson(id) {
    if (!window.confirm("Haluatko varmasti poistaa henkilön?")) return 
    const response = await personsService.remove(id)

    if (response.status == 404) {
      alert('Käyttäjän tiedot on jo poistettu')
    }
    this.updatePersons()
  }

  async addPerson(event) {
    event.preventDefault()

    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    // If person already exists, exit early
    const matchingPerson = this.state.persons
      .find(person => person.name === this.state.newName)
  
    if (matchingPerson) {
      const question = `${matchingPerson.name} on jo luettelossa, korvataanko vanha numero uudella?`
      if (!window.confirm(question)) return
      personsService.update(matchingPerson.id, newPerson)
    } else {   
      const response = await personsService.create(newPerson)
      if (response.status != 201) {
        alert('Failed, try again')
        return
      }
    }
    
    // Update persons and clear input fields
    this.updatePersons()
    this.setState({
      newName: '',
      newNumber: '',
    })

    this.setNotification(`lisättiin ${newPerson.name}`)
  }

  setNotification(message) {
    this.setState({ notification: message })
    setTimeout(() => this.setState({ notification: null }), 3000)
  }

  render() {
    return (
      <div>
        <Notification message={this.state.notification} />
        <h2>Puhelinluettelo</h2>
        rajaa näytettäviä <input
          value={this.state.filterString}
          onChange={(event) => this.setState({ filterString: event.target.value })}
        />
        <Form
          name={this.state.newName}
          number={this.state.newNumber}
          addPerson={this.addPerson}
          onNameChange={(event) => this.setState({ newName: event.target.value })}  
          onNumberChange={(event) => this.setState({ newNumber: event.target.value })}  
        />
        <List
          filter={this.state.filterString}
          persons={this.state.persons}
          deletePerson={(id) => this.deletePerson(id)}
        />
      </div>
    )
  }
}

export default App
