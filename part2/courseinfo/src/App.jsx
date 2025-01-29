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
      <h2>{props.course.name}</h2>
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


const Total = ({course}) => {
  const sum = course.parts.reduce((a, b) => a + b.exercises, 0); 
  return (
    <>
      <p><strong>Number of exercises: {sum}</strong></p>
    </>
  )
}

const Courses = ({courses}) => {

  return (
    <>
      <h1>Web development Curriculum</h1>
      {courses.map((course, i) =>
        <div key={i}>
          <Header course={course} />
          <Content course={course} />
          <Total course={course} />
        </div>
      )}
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Courses courses={courses} />
    </div>
  )
}

export default App