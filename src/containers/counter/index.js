import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'

import {TitleBar, SideDrawer} from '../../components'

import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../modules/counter'

import {
  openDrawer,
  closeDrawer
} from '../../modules/view'

const mapStateToProps = state => ({
  count: state.counter.count,
  isIncrementing: state.counter.isIncrementing,
  isDecrementing: state.counter.isDecrementing,
  sideDrawerOpen: state.view.sideDrawerOpen
})

const mapDispatchToProps = dispatch => bindActionCreators({
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  openDrawer,
  closeDrawer
}, dispatch)

const styles = {
  container: {
    margin: 10
  },
  spacer: {
    marginRight: 10
  },
}

class Counter extends Component {

  render() {
    const classes = this.props.classes

    return (
      <div>
        <TitleBar title="Counter" onOpenDrawer={this.props.openDrawer} />

        <div className={classes.container}>
          <h1>Counter</h1>
          <p>Count: {this.props.count}</p>

          <p>
            <Button
              raised
              className={classes.spacer}
              disabled={this.props.isIncrementing}
              onClick={this.props.increment}>
              Increment
            </Button>
            <Button
              raised
              className={classes.spacer}
              disabled={this.props.isIncrementing}
              onClick={this.props.incrementAsync}>
              Increment Async
            </Button>
          </p>

          <p>
            <Button
              raised
              className={classes.spacer}
              disabled={this.props.isDecrementing}
              onClick={this.props.decrement}>
              Decrementing
            </Button>
            <Button
              raised
              disabled={this.props.isDecrementing}
              onClick={this.props.decrementAsync}>
              Decrement Async
            </Button>
          </p>
        </div>

        <SideDrawer
          open={this.props.sideDrawerOpen}
          history={this.props.history}
          onRequestClose={this.props.closeDrawer}
          onClick={this.props.closeDrawer}/>

      </div>
    )
  }
}

Counter.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Counter))
