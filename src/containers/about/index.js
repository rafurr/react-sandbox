import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {withStyles} from 'material-ui/styles'
import Button from 'material-ui/Button'

import HomeIcon from 'mdi-react/HomeCircleIcon'

import {TitleBar, LeftDrawer} from '../../components'

import {openLeftDrawer, closeLeftDrawer} from '../../modules/view'

const mapStateToProps = state => ({
  leftDrawerOpen: state.view.leftDrawerOpen,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openLeftDrawer,
      closeLeftDrawer,
    },
    dispatch
  )

const styles = {
  fixedTop: {
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 1000,
  },
  scrollableContainer: {
    top: 0,
    marginTop: 56,
    marginBottom: 56,
    position: 'absolute',
  },
  container: {
    margin: 10,
  },
  spacer: {
    marginRight: 10,
  },
}

class About extends Component {
  render() {
    const classes = this.props.classes

    return (
      <div>
        <div className={classes.fixedTop}>
          <TitleBar title="About" onOpenDrawer={this.props.openLeftDrawer} />
        </div>

        <div className={classes.scrollableContainer}>
          <div className={classes.container}>
            <h2>About</h2>
            <p>This application was developed by Robert Furr.</p>
            <div>
              <Button onClick={() => this.props.history.push('/')}>
                <HomeIcon /> Home
              </Button>
            </div>
            <div>
              <Button onClick={() => this.props.history.push('/bad-link')}>
                <HomeIcon /> Bad Link
              </Button>
            </div>
          </div>
        </div>

        <LeftDrawer
          open={this.props.leftDrawerOpen}
          history={this.props.history}
          onRequestClose={this.props.closeLeftDrawer}
          onClick={this.props.closeLeftDrawer}
        />

      </div>
    )
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(About)
)
