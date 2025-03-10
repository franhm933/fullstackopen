import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm';
import Header from './components/Header';
import personService from './services/person.js'
import Notification from './components/Notification.jsx';

const App = () => {
  const [allPersons, setAllPersons] = useState([]);

  const [persons, setPersons] = useState(allPersons);

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

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
          updateNotification('Person ' + newName + ' added to phonebook')
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
          personService
            .update(personID, personObject)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== personID ? person : returnedPerson))
              setAllPersons(allPersons.map(person => person.id !== personID ? person : returnedPerson))
              updateNotification(newName + ' has been updated (phone)')
              setNewName('')
              setNewPhone('')
            })
            .catch(error => {
              updateNotification('Error: ' + error, 'error')
            })
        }
      } else {
        updateNotification(handleCheckNamePhone(), 'error')
      }
    } else {
      updateNotification('Some field is not filled', 'error')
    }
  }

  const updateNotification = (text, type = 'success') => {
    setNotificationMessage(text)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
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

      const person = persons.find(p => p.id === id)

      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setAllPersons(allPersons.filter(person => person.id !== id))
        })
        .catch(error => {
          //console.log('Error al eliminar', error)
          updateNotification( `Information of '${person.name}' was already deleted from server`, 'error')
          setPersons(persons.filter(person => person.id !== id))
          setAllPersons(allPersons.filter(person => person.id !== id))
        })
    }
  }

  const filterName = (event) => {
    console.log(event.target.value)
  }

  return (
    <div>
      <Header text='Phonebook'/>
      <Notification message ={notificationMessage} type={notificationType}/>
      <Filter search={newSearch} handle={handleSearchChange}/>
      <Header text='Add a new'/>
      <PersonForm submit={addName} nameVal={newName} nameHandle={handleNameChange} phoneVal={newPhone} phoneHandle={handlePhoneChange} />
      <Header text='Numbers'/>
      <Persons persons={persons} handleRemove={handleRemove} />
    </div>
  )
}

export default App