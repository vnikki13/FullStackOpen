const Contact = ({name, number, handleDelete}) => {
  return (
    <>
      <p>{name} {number}</p>
      <button onClick={handleDelete}>delete</button>
    </>
  )
}

export default Contact