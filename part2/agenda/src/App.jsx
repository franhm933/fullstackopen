import { useState } from 'react'
import Persons from './components/Persons'

const App = () => {
  const [allPersons, setAllPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]);

  const [persons, setPersons] = useState(allPersons);

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')

  //Methods
  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      phone: newPhone
    }
    if(handleEmptyOk()) {
      if(handleCheckNamePhone() == 'ok') {
        setPersons(allPersons.concat(personObject))
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

    if((allPersons.some(allPersons => allPersons.name === newName)) && (allPersons.some(allPersons => allPersons.phone === newPhone))) {
      errorMessage = "The contact" + newName + " with phone number " + newPhone + " is already added to phonebook"
    } else if(allPersons.some(allPersons => allPersons.name === newName)) {
      errorMessage = newName + " is already added to phonebook"
    } else if(allPersons.some(allPersons => allPersons.phone === newPhone)) {
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
  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setNewSearch(searchValue);

    if (searchValue === '') {
      setPersons(allPersons); // Restaurar lista original si se borra el input
    } else {
      const filteredPersons = allPersons.filter(person => person.name.toLowerCase().includes(searchValue));
      setPersons(filteredPersons);
    }
  } 

  const filterName = (event) => {
    console.log(event.target.value)
  }

  return (
    <div>
      {persons.name}
      <h2>Phonebook</h2>
      <div>
        filter shown with 
        <input
        value={newSearch}
        onChange={handleSearchChange}
      />
      </div>
      <h2>add a new </h2>
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