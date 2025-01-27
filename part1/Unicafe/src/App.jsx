import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Feedback = ({onGoodClick, onNeutralClick, onBadClick}) => {
  return (
    <>
      <h1>Give Feedback</h1>
      <Button onClick={onGoodClick} text={'good'} />
      <Button onClick={onNeutralClick} text={'neutral'} />
      <Button onClick={onBadClick} text={'bad'} />
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text={'good'} value={good}/>
          <StatisticLine text={'neutral'} value={neutral} />
          <StatisticLine text={'bad'} value={bad} />
          <StatisticLine text={'all'} value={total} />
          <StatisticLine text={'average'} value={(good - bad) /(total || 1)} />
          <StatisticLine text={'positive'} value={(good / (total || 1)) * 100} />
        </tbody>
      </table>
      
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <>
      <Feedback
        onGoodClick={handleGoodClick}
        onNeutralClick={handleNeutralClick}
        onBadClick={handleBadClick}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App