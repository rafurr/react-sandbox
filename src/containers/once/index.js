import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'

import {TitleBar, SideDrawer} from '../../components'
import {once} from '../../utils/once'

import {
  openDrawer,
  closeDrawer
} from '../../modules/view'

import {
  toggleDescription,
} from '../../modules/once'

const mapStateToProps = state => ({
  sideDrawerOpen: state.view.sideDrawerOpen,
  showDescription: state.once.showDescription
})

const mapDispatchToProps = dispatch => bindActionCreators({
  openDrawer,
  closeDrawer,
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
      '1',
      'n'
    ]

    return (
      <p>
        {lines.map((line, index) => this.makeSourceLine(line, index, classes))}
      </p>
    )
  }

  bootstrapApp = () => {
    console.log('executed once')
    return 22
  }

  handleToggleDescriptionClick = () => {
    this.props.toggleDescription()
  }

  handleOnceClick = () => {
    const bootstrapApp = () => {
      console.log('executed once')
      return 22
    }

    let initialize = once(bootstrapApp)
    console.log(initialize())
    console.log(initialize())
 }

  render() {
    const classes = this.props.classes

    return (
      <div>
        <TitleBar title="Once" onOpenDrawer={this.props.openDrawer} />

        <div className={classes.container}>
          <h2 className={classes.title} onClick={this.handleToggleDescriptionClick}>Once</h2>
          {this.props.showDescription && <div>
            <p>Once Description</p>
            {this.makeSource()}
          </div>}
          <Button raised className={classes.spacer} onClick={this.handleOnceClick}>Once</Button>
        </div>

        <SideDrawer
          open={this.props.sideDrawerOpen}
          history={this.props.history}
          onRequestClose={this.props.closeDrawer}
          onClick={this.props.closeDrawer} />

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
