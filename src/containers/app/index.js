import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Home from '../home'
import Sort from '../sort'
import Once from '../once'
import Curry from '../curry'
import Counter from '../counter'
import About from '../about'
import Error404 from '../error404'

import {
  openLeftDrawer,
  closeLeftDrawer
} from '../../modules/view'

const mapStateToProps = state => ({
  leftDrawerOpen: state.view.leftDrawerOpen,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  openLeftDrawer,
  closeLeftDrawer
}, dispatch)

const App = () => (
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

App.propTypes = {
  classes: PropTypes.object
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (App)
