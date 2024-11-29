import { useState } from 'react'

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad;
  const opinionAverage = () => {
    const valueGood = props.good * 1;
    const valueNeutral = props.neutral * 0;
    const valueBad = props.bad * -1;
    const average = (valueGood + valueNeutral + valueBad) / total;
    if(isNaN(average)) {
      return 'No feedback'
    } else {
      return average
    }
  }

  const positiveAverage = () => {
    const average = props.good / total;
    if(isNaN(average)) {
      return 'No positive feedback'
    } else {
      return average
    }
  }
  if(total == 0) {
    return (
      <div>
        <h2>{props.title}</h2>
        <p>No feedback given</p>
      </div>
    )

  } else {
    return (
      <div>
        <h2>{props.title}</h2>
        <table>
          <tbody>
            <StatisticLine name="Good" value={props.good} />
            <StatisticLine name="Neutral" value={props.neutral} />
            <StatisticLine name="Bad" value={props.bad} />
            <StatisticLine name="All" value={total} />
            <StatisticLine name="Average" value={opinionAverage()} />
            <StatisticLine name="Positive" value={positiveAverage()} />
          </tbody>
        </table>
      </div>
    )
  }
  
}

const StatisticLine = (props) => (
    <tr>
      <td>{props.name}</td>
      <td>{props.value}</td>
    </tr>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1;
    setGood(updatedGood)
  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral)
  }
  const handleBadClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Statistics title='Statistics' good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

export default App