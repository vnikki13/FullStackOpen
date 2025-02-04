import Contact from './Contact'

function Contacts({ contacts, handleDelete }) {
  return (
    <>
      <h2>Numbers</h2>
      {contacts.map((contact) => {
        return <Contact
          key={contact.name}
          name={contact.name}
          number={contact.number}
          handleDelete={() => handleDelete(contact.id)}
        />
      })}
    </>
  )
}

export default Contacts