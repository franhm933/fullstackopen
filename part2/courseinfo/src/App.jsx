const Part = (props) => {

  return (
    <>
      <p>
        {props.part} {props.exercise}
      </p>
    </>
  )
}

const Header = (props) => {

  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Content = ({course}) => {

  return (
    <>
      {course.parts.map((part, i) =>
        <Part key={part.id} part={course.parts[i].name} exercise={course.parts[i].exercises}/>
      )}
    </>
  )
}


const Total = (props) => {

  return (
    <>
      <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
    </>
  )
}

const Course = ({course}) => {

  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App