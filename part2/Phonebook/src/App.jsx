import { useState, useEffect } from 'react'

import contactService from './services/contacts'
import Contacts from './components/Contacts'
import ContactForm from './components/ContactForm'
import FilterContact from './components/FilterContact'
import Notification from './components/Notification'

const App = () => {
  const [contacts, setContacts] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({type: null, message: null})

  useEffect(() => {
    contactService
      .getAll()
      .then((contacts) => setContacts(contacts))
  }, [])

  const addPerson = (event) => { 
    event.preventDefault()
    const foundContact = contacts.find((person) => { return person.name.toLowerCase() === newName.toLowerCase() })
    if (foundContact) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        contactService
          .update(foundContact.id, { ...foundContact, number: newNumber })
          .then(updatedContact => {
            setContacts(contacts.map((contact) => contact.id === updatedContact.id ? updatedContact : contact))
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      contactService
        .create(newPerson)
        .then(contact => {
          setContacts(contacts.concat(contact))
        })
    }
    setNewName('')
    setNewNumber('')
    setNotificationMessage({type: 'success', message: `Added ${newName}`})
    setTimeout(() => setNotificationMessage({type: null, message: null}), 3000)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const handleDelete = id => {
    const name = contacts.find(contact => contact.id === id).name
    if (window.confirm(`Delete ${name}`)) {
      contactService
      .remove(id)
      .then(() => {
        setContacts(contacts.filter(contact => contact.id !== id))
      })
        .catch(() => {
          setNotificationMessage({type: 'error', message: `Information of ${name} has already been removed from server`})
          setTimeout(() => setNotificationMessage({type: null, message: null}), 3000)
      })
    }
  }

  const filteredPeople = contacts.filter((person) => {
    return person.name.toLowerCase().includes(filterName)
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={notificationMessage.type} message={notificationMessage.message} />
      <FilterContact filterName={filterName} handleFilterChange={handleFilterChange}/>
      <ContactForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Contacts contacts={filteredPeople} handleDelete={handleDelete} />
    </div>
  )
}

export default App