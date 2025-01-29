import { useState } from 'react'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
    }
    if(!handleCheckName()) {
      setPersons(persons.concat(personObject))
      setNewName('')
    } else {
      alert(`${newName} is already added to phonebook`);
      setNewName('')
    }
  }

  const handleCheckName = (event) => {
    return persons.some(persons => persons.name === newName);
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  } 

  return (
    <div>
      {persons.name}
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input
          value={newName}
          onChange={handleNameChange}
        />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <Persons key={person.name} persons={person} />
      )}
    </div>
  )
}

export default App