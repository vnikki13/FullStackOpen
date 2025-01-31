import Part from "./Part"

const Content = ({ exercises }) => {
  const total = exercises.reduce((total, exercise) => total += exercise.exercises, 0)
  return (
    <>
      {exercises.map((exercise) => {
        return <Part key={exercise.id} exercise={exercise}/>
      })}
      <p style={{fontWeight: 'bold'}}>total of {total} exercises</p>
    </>
  )
}

export default Content