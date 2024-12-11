import {Link, withRouter} from 'react-router-dom'

const Header = props => {
  const handleLogout = () => {
    // Clear authentication token or other session data
    localStorage.removeItem('token')
    // Redirect to the login page
    const {history} = props
    history.push('/login')
  }

  return (
    <header>
      <Link to="/">
        <img src="logo.png" alt="Website Logo" />
      </Link>
      <nav>
        <ul>
          {/* Conditional rendering for the Logout button */}
          {localStorage.getItem('token') ? (
            <li>
              <button onClick={handleLogout} type="button">
                Logout
              </button>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  )
}

export default withRouter(Header)
