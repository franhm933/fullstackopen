import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Title = (props) => (
  <h2>{props.title}</h2>
)

const AnecdoteMostVoted = (props) => {
  

  return (
    <p>{props.anecdote} - <strong>has {props.votes} votes</strong></p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array(anecdotes.length).fill(0))

  //Most voted
  const maxNumber = Math.max(...votes);
  const maxIndex = votes.indexOf(maxNumber);
  const anecdoteMostVoted = anecdotes[maxIndex]
  anecdoteMostVoted

  const handleVoteClick = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVote(copyVotes)
  }
  const handleNextClick = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  }

  return (
    <div>
      <Title title="Anecdote of the day"/>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={handleNextClick} text='next anecdote' />
      <Title title="Anecdote with most votes"/>
      <AnecdoteMostVoted anecdote={anecdoteMostVoted} votes={maxNumber} />
    </div>
  )
}

export default App