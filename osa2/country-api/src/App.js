import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      query: '',
      countries: []
    }
  }

  componentWillMount() {
    this.fetchData()
  }

  async fetchData() {
    const response = await fetch('https://restcountries.eu/rest/v2/all')
    const countries = await response.json()
    this.setState({ countries: countries })
  }

  getContent() {
    const visibleCountries = this.state.countries
    .filter(country => country.name.toLowerCase().includes(this.state.query.toLowerCase()))

    if (visibleCountries.length == 1) {
      const country = visibleCountries[0]
      return (
        <div>
          <h1>{country.name}</h1>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <img src={country.flag} />
        </div>
      )
    } else if (visibleCountries.length > 10) {
      return <p>too many matches, specify another filter</p>
    } else {
      return visibleCountries.map(country => <p key={country.name}>{country.name}</p>)
    }
  }

  render() {
     return (
      <div className="App">
        <p>find countries</p>
        <input value={this.state.query} onChange={(event) => this.setState({ query: event.target.value })} />
        { this.getContent() }
      </div>
    );
  }
}

export default App;
