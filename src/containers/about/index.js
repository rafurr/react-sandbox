import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'

import HomeIcon from 'mdi-react/HomeCircleIcon'
import ErrorIcon from 'mdi-react/LinkOffIcon'

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
  },
}

class About extends Component {

  render() {
    const classes = this.props.classes

    return (
      <div>
        <TitleBar title="About" onOpenDrawer={this.props.openLeftDrawer} />

        <div className={classes.container}>
          <h2>About</h2>
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

        <LeftDrawer
          open={this.props.leftDrawerOpen}
          history={this.props.history}
          onRequestClose={this.props.closeLeftDrawer}
          onClick={this.props.closeLeftDrawer} />

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
