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

const mapStateToProps = state => ({
  sideDrawerOpen: state.view.sideDrawerOpen
})

const mapDispatchToProps = dispatch => bindActionCreators({
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

class Once extends Component {

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
          <h1>Once</h1>
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
