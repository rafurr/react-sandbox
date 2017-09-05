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

          <h2>This application is Under Construction.</h2>
          <h4>Please drive carefully and pardon the dust.</h4>
          <p>Over the next few days and weeks I will enhancing the UI/UX of the application and implementing better design patterns and best practices. So check back to see the progress.</p>
          <p>This application was bootstrapped with Create React App and is intended to demonstrate how to construct an application that uses React, Redux, React Router, Material-UI and other technologies. As time permits, this application will be updated to use additional front end and back end technologies. The application is a Single Page Application (SPA) that is a responsive, mobile first application.</p>
          <p>This application also demonstrates a few code challenges taken to the next level where the challenges are incorporated into the application in an attempt showcase the above mentioned technologies and my knowledge and expertise in using them. Initially a lot of bootstrapping and experimentation had to be done latest versions technologies. I have used the previous versions but want this application to be current and a little bleeding edge. For example, Material-UI is still in beta and is a departure from it previous version.</p>
          <h2>How to use the application</h2>
          <p>The pages of this application can be reached either by the links on the menu bar at the top of this page or by the left slide out menu accessible using the hamburger menu icon in the title bar.</p>
          <p>Tapping the headers within the code challenge pages will display a description and implementation of the code being demonstrated.</p>
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
