import React, { Component } from 'react'

import { Button, Card } from '@cedcommerce/ounce-ui'
import '@cedcommerce/ounce-ui/dist/index.css'
import Home from './component/Home'
import Edit from './component/Edit'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';

export default class App extends Component {
  constructor() {
    super()

    this.state = {

    }
  }

  render() {
    return (
      <Card>
        <Router>
          <Button ><Link to="/" style={{ color: 'white' }}>Home</Link></Button>
          <Button ><Link to="/Edit" style={{ color: 'white' }}>Edit</Link></Button>

          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/Edit' component={Edit} />

          </Switch>


        </Router>


      </Card>

    )
  }
}