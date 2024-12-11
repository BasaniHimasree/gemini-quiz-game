import {Component} from 'react'

const quizQuestionsApiUrl = 'https://apis.ccbp.in/assess/questions'

class QuizGameRoute extends Component {
  state = {
    isLoading: true,
    error: null,
    questions: [],
    currentQuestionIndex: 0,
    selectedOption: null,
    timer: 15,
  }
  // timerInterval: null,

  componentDidMount() {
    this.fetchQuestions()
    this.intervalId = setInterval(this.decrementTimer, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  fetchQuestions = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      // Redirect to login if not authenticated
      const {history} = this.props
      history.push('/login')
      return
    }

    try {
      const response = await fetch(quizQuestionsApiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        this.setState({questions: data.questions, isLoading: false})
      } else {
        throw new Error('Failed to fetch questions')
      }
    } catch (error) {
      this.setState({error: error.message, isLoading: false})
    }
  }

  decrementTimer = () => {
    const {timer} = this.state
    if (timer > 0) {
      this.setState(prevState => ({timer: prevState.timer - 1}))
    } else {
      this.handleNextQuestion(true) // Move to next question if time runs out
    }
  }

  handleOptionChange = option => {
    this.setState({selectedOption: option, timer: 15}) // Reset timer on selection
    clearInterval(this.intervalId) // Stop timer on selection
  }

  handleNextQuestion = (isTimeUp = false) => {
    const {selectedOption, currentQuestionIndex, questions} = this.state
    if (isTimeUp || selectedOption) {
      const nextIndex = currentQuestionIndex + 1
      if (nextIndex < questions.length) {
        this.setState({
          currentQuestionIndex: nextIndex,
          selectedOption: null,
        })
        this.intervalId = setInterval(this.decrementTimer, 1000) // Restart timer
      } else {
        // Submit quiz if last question
        const {history} = this.props
        history.push('/game-results') // Redirect to results
      }
    }
  }

  renderQuestionOptions = question => {
    const {selectedOption} = this.state
    switch (question.option_type) {
      case 'DEFAULT':
        return question.options.map(option => (
          <button
            type="button"
            key={option.id}
            className={`if (selectedOption === option.id) {
      if (selectedOption === question.correct_answer) {
        return 'option selected correct'
      } else {
      return 'option selected wrong'
      }
    } else {
      return ""
    }
`}
            onClick={() => this.handleOptionChange(option.id)}
          >
            {option.content}
          </button>
        ))
      case 'IMAGE':
        return question.options.map(option => (
          <button
            type="button"
            key={option.id}
            className={`if (selectedOption === option.id) {
      if (selectedOption === question.correct_answer) {
        return 'option selected correct'
      } else {
        return  'option selected wrong'
      }
    } else {
      return "" 
    }
            `}
            onClick={() => this.handleOptionChange(option.id)}
          >
            <img src={option.content} alt={option.id} />
          </button>
        ))
      case 'SINGLE SELECT':
        return question.options.map(option => (
          <label key={option.id} className="radio-option" aria-label="close">
            <input
              type="radio"
              name="option"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => this.handleOptionChange(option.id)}
            />
            {option.content}
          </label>
        ))
      default:
        return null
    }
  }

  render() {
    const {
      isLoading,
      error,
      questions,
      currentQuestionIndex,
      timer,
      selectedOption,
    } = this.state

    if (isLoading) {
      return <div>Loading questions...</div>
    }

    if (error) {
      return <div>Error: {error}</div>
    }

    const currentQuestion = questions[currentQuestionIndex]

    return (
      <div>
        <h1>Quiz Game</h1>
        <p>Time Remaining: {timer}s</p>
        <h2>{currentQuestion.question}</h2>
        <div className="options">
          {this.renderQuestionOptions(currentQuestion)}
        </div>
        <button
          disabled={!selectedOption}
          onClick={this.handleNextQuestion}
          type="button"
        >
          Next Question
        </button>
      </div>
    )
  }
}

export default QuizGameRoute
