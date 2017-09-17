/* eslint-disable flowtype/require-valid-file-annotation */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Switch, BrowserRouter} from 'react-router-dom'

import withStyles from 'material-ui/styles/withStyles'
import withRoot from '../../components/withRoot'

import Home from '../home'
import Sort from '../sort'
import Once from '../once'
import Curry from '../curry'
import Counter from '../counter'
import About from '../about'
import Error404 from '../error404'

const styles = {
  root: {},
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/sort" component={Sort} />
          <Route exact path="/once" component={Once} />
          <Route exact path="/curry" component={Curry} />
          <Route exact path="/counter" component={Counter} />
          <Route exact path="/about-us" component={About} />
          <Route path="*" component={Error404} />
        </Switch>
      </BrowserRouter>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(App))
