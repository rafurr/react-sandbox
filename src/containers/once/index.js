import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'

import {TitleBar, LeftDrawer} from '../../components'
import {once} from '../../utils/once'

import {
  openLeftDrawer,
  closeLeftDrawer
} from '../../modules/view'

import {
  toggleDescription,
} from '../../modules/once'

const mapStateToProps = state => ({
  leftDrawerOpen: state.view.leftDrawerOpen,
  showDescription: state.once.showDescription
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
  sourceCode: {
    marginTop: 0,
    marginBottom: 0,
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

class Once extends Component {

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
      'once = (fn, ctx) => {',
      '  let result',
      '  return function () {',
      '    if (fn) {',
      '      result = fn.apply(ctx || this, arguments)',
      '      fn = null',
      '    }',
      '    return result',
      '  }',
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
      "const bootstrapApp = () => {",
      "  console.log('executed once')",
      "  return 22",
      "}",
      "",
      "const initialize = once(bootstrapApp)",
      "console.log(initialize())",
      "console.log(initialize())",
      "// executed once",
      "// 22",
      "// 22",
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

  handleOnceClick = () => {
    console.clear()

    const bootstrapApp = () => {
      console.log('executed once')
      return 22
    }

    const initialize = once(bootstrapApp)
    console.log(initialize())
    console.log(initialize())
    // executed once
    // 22
    // 22
  }

  render() {
    const classes = this.props.classes

    return (
      <div>
        <TitleBar title="Once" onOpenDrawer={this.props.openLeftDrawer} />

        <div className={classes.container}>
          <h2 className={classes.title} onClick={this.handleToggleDescriptionClick}>Once</h2>
          {this.props.showDescription && <div>
            <p>The once function creates a version of the function that can only be called one time. Repeated calls to the modified function will have no effect, returning the value from the original call. Useful for initialization functions, instead of having to set a boolean flag and then check it later.</p>
            <h4 className={classes.sourceCode}>Source Code</h4>
            {this.makeSource()}
          </div>}
          <h4 className={classes.exampleTitle}>Example</h4>
          {this.makeExample()}
          <h4>When the button below is pressed, the output will be logged to the console. Open the browser Console to verify.</h4>
          <Button raised className={classes.spacer} onClick={this.handleOnceClick}>Once</Button>
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

Once.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Once))
