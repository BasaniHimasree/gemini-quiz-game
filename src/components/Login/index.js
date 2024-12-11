import {Component} from 'react'

// Login component
class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
    showPassword: false,
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value, errorMessage: ''})
  }

  handleShowPassword = () => {
    const {showPassword} = this.state
    this.setState({showPassword: !showPassword})
  }

  handleSubmit = event => {
    event.preventDefault()

    const {username, password} = this.state
    const credentials = {username, password}

    fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Login failed') // Handle errors gracefully
      })
      .then(data => {
        localStorage.setItem('token', data.jwt_token)
        const {history} = this.props
        history.push('/home') // Redirect on successful login
      })
      .catch(error => {
        this.setState({errorMessage: error.message || 'Login failed'})
      })
  }

  render() {
    const {username, password, errorMessage, showPassword} = this.state

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            required
          />
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={this.handleShowPassword}
          />
          <label htmlFor="showPassword">Show Password</label>
          <button type="submit">Login</button>
        </form>
        {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
      </div>
    )
  }
}

export default Login
