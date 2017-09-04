import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'

import {TitleBar, SideDrawer} from '../../components'

import {
  openDrawer,
  closeDrawer
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
  sideDrawerOpen: state.view.sideDrawerOpen,
  showDescription: state.counter.showDescription
})

const mapDispatchToProps = dispatch => bindActionCreators({
  openDrawer,
  closeDrawer,
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  toggleDescription
}, dispatch)

const styles = {
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
  },
  code0: {
    display: 'block'
  },
  code1: {
    display: 'block',
    marginLeft: 15
  },
  code2: {
    display: 'block',
    marginLeft: 30
  },
  code3: {
    display: 'block',
    marginLeft: 45
  }
}

class Counter extends Component {

  makeSourceLine = (line, index, classes) => {
    const lineClass = line.startsWith("      ")
      ? classes.code3
      : line.startsWith("    ")
        ? classes.code2
        : line.startsWith("  ") ? classes.code1 : classes.code0;

    return (
      <code key={'line'+index} className={lineClass}>{line}</code>
    )
  }

  makeSource = () => {
    const classes = this.props.classes

    const lines = [
      '1',
      'n'
    ]

    return (
      <p>
        {lines.map((line, index) => this.makeSourceLine(line, index, classes))}
      </p>
    )
  }

  handleToggleDescriptionClick = () => {
    this.props.toggleDescription()
  }

  render() {
    const classes = this.props.classes

    return (
      <div>
        <TitleBar title="Counter" onOpenDrawer={this.props.openDrawer} />

        <div className={classes.container}>
          <h2 className={classes.title} onClick={this.handleToggleDescriptionClick}>Counter</h2>
          {this.props.showDescription && <div>
            <p>Counter Description</p>
            {this.makeSource()}
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
