import React from 'react'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'

import { MainPage } from 'pages/MainPage'
import { LoginPage } from 'pages/LoginPage'
import { CreatePage } from 'pages/CreatePage'

export const MainRouter = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/create" component={CreatePage} />
        <Route exact path="/" component={MainPage} />
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>
)
