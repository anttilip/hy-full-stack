import React from 'react'

const List = ({ persons, filter, deletePerson }) => {
  const filterPersons = () => {
    if (filter.length === 0) return persons

    return persons
        .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  }

  const visiblePersons = filterPersons()

  return ( 
    <div>
      <h2>Numerot:</h2>
      { visiblePersons.map(person =>
        <p key={person.name}>
          {person.name} {person.number}
          <input
            type="button"
            value="poista"
            onClick={() => deletePerson(person.id)}
          />
        </p>) }
    </div>
  )
}

export default List
