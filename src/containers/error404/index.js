import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'

import HomeIcon from 'mdi-react/HomeCircleIcon'

import {} from '../../modules/view'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

const styles = {
  view: {
  },
  container: {
  },
  title: {
    paddingTop: 10,
    marginBottom: 5
  },
  subTitle: {
    marginTop: 5,
    marginBottom: 5
  },
  spacer: {
    marginRight: 10
  }
}

class Error404 extends Component {

  render() {
    const classes = this.props.classes

    const show = true

    return (
      <div id="error404View" className={classes.view}>

        {show && <div id="error404Container" className={classes.container}>
          <h2 className={classes.title}>Error 404 - Page Not Found</h2>
          <h3 className={classes.subTitle}>Go Gators or Go Home</h3>
          <div>
            <Button onClick={() => this.props.history.push('/')}>
              <HomeIcon /> Home
            </Button>
          </div>
        </div>}

      </div>
    )
  }
}

Error404.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Error404))
