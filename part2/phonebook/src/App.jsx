import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm';
import Header from './components/Header';

const App = () => {
  const [allPersons, setAllPersons] = useState([]);

  const [persons, setPersons] = useState(allPersons);

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setAllPersons(response.data)
      setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')

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
        setAllPersons(persons.concat(personObject))
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
      errorMessage = "The contact " + newName + " with phone number " + newPhone + " is already added to phonebook"
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
      <Header text='Phonebook'/>
      <Filter search={newSearch} handle={handleSearchChange}/>
      <Header text='Add a new'/>
      <PersonForm submit={addName} nameVal={newName} nameHandle={handleNameChange} phoneVal={newPhone} phoneHandle={handlePhoneChange} />
      <Header text='Numbers'/>
      <Persons persons={persons} />
    </div>
  )
}

export default App