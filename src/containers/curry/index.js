import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'

import {TitleBar, LeftDrawer} from '../../components'
import {curry} from '../../utils/curry'

import {
  openLeftDrawer,
  closeLeftDrawer
} from '../../modules/view'

import {
  toggleDescription,
} from '../../modules/curry'

const mapStateToProps = state => ({
  leftDrawerOpen: state.view.leftDrawerOpen,
  showDescription: state.curry.showDescription
})

const mapDispatchToProps = dispatch => bindActionCreators({
  openLeftDrawer,
  closeLeftDrawer,
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
  exampleTitle: {
    marginBottom: 5,
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

class Curry extends Component {

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
      'makeArray = (args) => {',
      '  return Array.prototype.slice.apply(args)',
      '}',
      '',
      'curry = (fn) => {',
      '  function curried () {',
      '    if (arguments.length < fn.length) {',
      '      const args = makeArray(arguments)',
      '      return function () {',
      '        return curried.apply(this, args.concat(makeArray(arguments)))',
      '      }',
      '    } else {',
      '      return fn.apply(this, arguments)',
      '    }',
      '  }',
      '  return curried',
      '}'
    ]

    return (
      <p>
        {lines.map((line, index) => this.makeSourceLine(line, index, classes))}
      </p>
    )
  }

  makeExample = () => {
    const classes = this.props.classes

    const lines = [
      'const add = (a, b) => {',
      '  return a + b',
      '}',
      'const curried = curry(add)',
      'console.log(curried(1)(2))',
      '// 3'
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

  handleCurryClick = () => {
    console.clear()

    const add = (a, b) => {
      return a + b
    }
    const curried = curry(add)
    console.log(curried(1)(2))
    // 3
  }

  render() {
    const classes = this.props.classes

    return (
      <div>
        <TitleBar title="Curry" onOpenDrawer={this.props.openLeftDrawer} />

        <div className={classes.container}>
          <h2 className={classes.title} onClick={this.handleToggleDescriptionClick}>Curry</h2>
          {this.props.showDescription && <div>
            <p>The curry function creates a version of a function that allows partial application of a function’s arguments. What this means is that you can pass all of the arguments a function is expecting and get the result, or pass a subset of those arguments and get a function back that’s waiting for the rest of the arguments.</p>
            {this.makeSource()}
          </div>}
          <h4 className={classes.exampleTitle}>Example</h4>
          {this.makeExample()}
          <Button raised className={classes.spacer} onClick={this.handleCurryClick}>Curry</Button>
          <h4>Output will be logged to the console. Open the console window to verify.</h4>
        </div>

        <LeftDrawer
          open={this.props.leftDrawerOpen}
          history={this.props.history}
          onRequestClose={this.props.closeLeftDrawer}
          onClick={this.props.closeLeftDrawer} />

      </div>
    )
  }
}

Curry.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Curry))
