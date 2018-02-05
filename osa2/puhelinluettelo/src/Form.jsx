import React from 'react'

const Form = ({ name, number, onNameChange, onNumberChange, addPerson }) => {
  return ( 
    <div>
      <h2>Lisää uusi</h2>
      <form onSubmit={addPerson}>
        <div>
          nimi: <input
            value={name}
            onChange={onNameChange}
          /><br />
          numero: <input
            value={number}
            onChange={onNumberChange}
          />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    </div>
  )
}

export default Form
