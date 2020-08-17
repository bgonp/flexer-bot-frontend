import React from 'react'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'
import { MainPage } from 'pages/MainPage'
import { NotAuthedRouter } from './NotAuthedRouter'
import { LoginPage } from 'pages/LoginPage'

export const MainRouter = () => (
  <Router>
    <div>
      <Switch>
        <NotAuthedRouter exact path="/login" component={LoginPage} />
        <Route exact path="/" component={MainPage} />
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>
)
