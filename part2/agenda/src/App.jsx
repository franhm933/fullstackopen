import { useState } from 'react'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      phone: '040-1234567'

     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  //Methods
  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      phone: newPhone
    }
    if(handleEmptyOk()) {
      if(handleCheckNamePhone() == 'ok') {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewPhone('')
      } else {
        alert(handleCheckNamePhone());
      }
    } else {
      alert('Some field is not filled');
    }
  }

  const handleCheckNamePhone = (event) => {
    var errorMessage = 'ok';

    if((persons.some(persons => persons.name === newName)) && (persons.some(persons => persons.phone === newPhone))) {
      errorMessage = "The contact" + newName + " with phone number " + newPhone + " is already added to phonebook"
    } else if(persons.some(persons => persons.name === newName)) {
      errorMessage = newName + " is already added to phonebook"
    } else if(persons.some(persons => persons.phone === newPhone)) {
      errorMessage = newPhone + " is already added to phonebook"
    }
    return errorMessage;
  }
  const handleEmptyOk = (event) => {
    var status = true;

    if(newName == '' || newPhone == '') {
      status = false;
    }
    return status;
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  } 

  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setNewPhone(event.target.value)
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
        <br/>
        phone:
          <input
          value={newPhone}
          onChange={handlePhoneChange}
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