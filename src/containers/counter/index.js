import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'

import {TitleBar, LeftDrawer} from '../../components'

import {
  openLeftDrawer,
  closeLeftDrawer
} from '../../modules/view'

import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  toggleDescription,
} from '../../modules/counter'

const mapStateToProps = state => ({
  count: state.counter.count,
  isIncrementing: state.counter.isIncrementing,
  isDecrementing: state.counter.isDecrementing,
  leftDrawerOpen: state.view.leftDrawerOpen,
  showDescription: state.counter.showDescription
})

const mapDispatchToProps = dispatch => bindActionCreators({
  openLeftDrawer,
  closeLeftDrawer,
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  toggleDescription
}, dispatch)

const styles = {
  fixedTop: {
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 1000
  },
  scrollableContainer: {
    top: 0,
    marginTop: 56,
    marginBottom: 56,
    position: 'absolute'
  },
  container: {
    margin: 10
  },
  spacer: {
    marginRight: 10
  },
  title: {
    marginTop: 5,
    marginBottom: 5,
    cursor: 'pointer'
  }
}

class Counter extends Component {

  handleToggleDescriptionClick = () => {
    this.props.toggleDescription()
  }

  render() {
    const classes = this.props.classes

    return (
      <div>
        <div className={classes.fixedTop}>
          <TitleBar title="Counter" onOpenDrawer={this.props.openLeftDrawer} />
        </div>

        <div className={classes.scrollableContainer}>
          <div className={classes.container}>
            <h2 className={classes.title} onClick={this.handleToggleDescriptionClick}>Counter</h2>
            {this.props.showDescription && <div>
              <p>Counter demonstrates how to use Redux to update state data.</p>
            </div>}
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
        </div>

        <LeftDrawer
          open={this.props.leftDrawerOpen}
          history={this.props.history}
          onRequestClose={this.props.closeLeftDrawer}
          onClick={this.props.closeLeftDrawer}/>

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
