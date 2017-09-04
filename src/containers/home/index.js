import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import {TitleBar, LeftDrawer} from '../../components'

import {
  openLeftDrawer,
  closeLeftDrawer
} from '../../modules/view'

const mapStateToProps = state => ({
  leftDrawerOpen: state.view.leftDrawerOpen
})

const mapDispatchToProps = dispatch => bindActionCreators({
  openLeftDrawer,
  closeLeftDrawer
}, dispatch)

const styles = {
  container: {
    margin: 10
  },
  spacer: {
    marginRight: 10
  }
}

class Home extends Component {

  render() {
    const classes = this.props.classes

    return (
      <div>
        <TitleBar title="Home" onOpenDrawer={this.props.openLeftDrawer} />

        <div className={classes.container}>
          <header>
            <Link className={classes.spacer} to="/">Home</Link>
            <Link className={classes.spacer} to="/sort">Sort</Link>
            <Link className={classes.spacer} to="/once">Once</Link>
            <Link className={classes.spacer} to="/curry">Curry</Link>
            <Link className={classes.spacer} to="/counter">Counter</Link>
            <Link to="/about-us">About</Link>
          </header>

          <h2>Home</h2>
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

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home))
