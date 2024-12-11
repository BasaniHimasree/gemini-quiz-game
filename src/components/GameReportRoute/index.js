import {Component} from 'react'

class GameReportsRoute extends Component {
  state = {
    questions: [], // Assuming this is fetched from localStorage or API
    unattemptedQuestions: [],
  }

  componentDidMount() {
    // Assuming the questions and user's answers are stored in localStorage
    const questions = JSON.parse(localStorage.getItem('questions'))
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers'))

    const unattemptedQuestions = questions.filter(
      question => !userAnswers[question.id],
    )

    this.setState({questions, unattemptedQuestions})
  }

  render() {
    const {questions, unattemptedQuestions} = this.state

    return (
      <div>
        <h1>Exam Results</h1>
        {/* Display all questions with correct/incorrect answers highlighted */}
        {questions.map(question => (
          <div key={question.id}>
            <h3>{question.question}</h3>
            <ul>
              {question.options.map(option => (
                <li
                  key={option.id}
                  className={` if (option.id === question.correct_answer) {
  return 'correct-answer'
} else if (option.id === userAnswers[question.id]) {
  return 'incorrect-answer'
} else {
  return ''
}
                  `}
                >
                  {option.content}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Display unattempted questions with correct answers highlighted */}
        <h2>Unattempted Questions</h2>
        {unattemptedQuestions.map(question => (
          <div key={question.id}>
            <h3>{question.question}</h3>
            <ul>
              {question.options.map(option => (
                <li
                  key={option.id}
                  className={
                    option.id === question.correct_answer
                      ? 'correct-answer'
                      : ''
                  }
                >
                  {option.content}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  }
}

export default GameReportsRoute
