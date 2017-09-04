import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'

import {TitleBar, SideDrawer} from '../../components'
import {curry} from '../../utils/curry'

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

class Curry extends Component {

  handleCurryClick = () => {
    const add = (a, b) => {
      return a + b
    }
    const curried = curry(add)
    console.log(curried(1)(2)) // 3
  }

  render() {
    const classes = this.props.classes

    return (
      <div>
        <TitleBar title="Curry" onOpenDrawer={this.props.openDrawer} />

        <div className={classes.container}>
          <h1>Curry</h1>
          <Button raised className={classes.spacer} onClick={this.handleCurryClick}>Curry</Button>
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

Curry.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Curry))
