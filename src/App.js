import {Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import NotFound from './components/NotFound'
import QuizGameRoute from './components/QuizGameRoute'
import Home from './components/Home'
import GameReportRoute from './components/GameReportRoute'
import GameResultsRoute from './components/GameResultsRoute'
import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/quiz-game" component={QuizGameRoute} />
      <Route exact path="/game-report" component={GameReportRoute} />
      <Route exact path="/game-results" component={GameResultsRoute} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
