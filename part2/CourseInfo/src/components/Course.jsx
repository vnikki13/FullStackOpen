import Content from "./Content"
import Header from "./Header"

const Course = ({course}) => {
  return (
    <>
      <Header title={course.name} />
      <Content exercises={course.parts} />
    </>
  )
}

export default Course