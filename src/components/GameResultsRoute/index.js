import {Component} from 'react'
import {Link} from 'react-router-dom'

class GameResultsRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      correctAnswers: 0,
    }
  }

  componentDidMount() {
    // Assuming you have the correct answers stored somewhere (e.g., in localStorage)
    const correctAnswers = localStorage.getItem('correctAnswers')
    this.setState({correctAnswers: parseInt(correctAnswers)})
  }

  render() {
    const {correctAnswers} = this.state

    return (
      <div>
        {correctAnswers > 5 ? (
          <div>
            <h1>Congratulations! You Won!</h1>
            <p>You answered {correctAnswers} questions correctly.</p>
            <Link to="/">Go to Home</Link>
          </div>
        ) : (
          <div>
            <h1>You Lost!</h1>
            <p>You answered {correctAnswers} questions correctly.</p>
            <Link to="/">Try Again</Link>
          </div>
        )}
      </div>
    )
  }
}

export default GameResultsRoute
