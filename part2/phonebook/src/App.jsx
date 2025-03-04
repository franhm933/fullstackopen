import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm';
import Header from './components/Header';
import personService from './services/person.js'

const App = () => {
  const [allPersons, setAllPersons] = useState([]);

  const [persons, setPersons] = useState(allPersons);

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
    .getAll()
    .then(initialPersons => {
      setAllPersons(initialPersons)
      setPersons(initialPersons)
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
        personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setAllPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhone('')
        })
        
      } else if(handleCheckNamePhone() == 'updatePerson') {
        const personObject = {
          name: newName,
          phone: newPhone
        }
        if(window.confirm('This contact already exists with a different number, do you want to update it?')) {
          const personID = persons.find(person => person.name === newName).id
          console.log(personID)
          personService
            .update(personID, personObject)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== personID ? person : returnedPerson))
              setAllPersons(allPersons.map(person => person.id !== personID ? person : returnedPerson))
            })
            .catch(error => {
              alert('Error: ' + error)
            })
        }
      } else {
        alert(handleCheckNamePhone());
      }
    } else {
      alert('Some field is not filled');
    }
  }

  const handleCheckNamePhone = (event) => {
    var errorMessage = 'ok';
    console.log('hola')

    if(persons.some(person => person.name === newName && person.phone === newPhone)) {
      errorMessage = "The contact " + newName + " with phone number " + newPhone + " is already added to phonebook"
    } else if(persons.some(persons => persons.name === newName && persons.phone !== newPhone)) {
      errorMessage = "updatePerson"
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

  const handleRemove = (id) => {
    if(window.confirm('¿Seguro que quieres eliminarlo?')) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setAllPersons(allPersons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.log('Error al eliminar', error)
        })
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
      <Persons persons={persons} handleRemove={handleRemove} />
    </div>
  )
}

export default App