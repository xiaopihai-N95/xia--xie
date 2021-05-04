import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import LoginPage from './pages/login'
import HomePage from './pages/home'

const App: React.FC = () => {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path="/login" exact component={LoginPage}/>
        </Switch>
      </HashRouter>
      <HashRouter>
        <Switch>
          <Route path="/" exact component={HomePage}/>
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App
