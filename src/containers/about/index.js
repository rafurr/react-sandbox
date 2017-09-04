import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'

import HomeIcon from 'mdi-react/HomeCircleIcon'
import ErrorIcon from 'mdi-react/LinkOffIcon'

import {TitleBar, SideDrawer} from '../../components'

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

class About extends Component {

  render() {
    const classes = this.props.classes

    return (
      <div>
        <TitleBar title="About" onOpenDrawer={this.props.openDrawer} />

        <div className={classes.container}>
          <h1>About</h1>
          <div>
            <span>Home</span>
            <IconButton>
              <HomeIcon onClick={() => this.props.history.push('/')} />
            </IconButton>
          </div>
          <div>
            <span>Bad Link</span>
            <IconButton>
              <ErrorIcon onClick={() => this.props.history.push('/bad-link')} />
            </IconButton>
          </div>
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

About.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(About))
