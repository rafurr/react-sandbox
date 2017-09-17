import React, {Component} from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'

import Avatar from 'material-ui/Avatar'
import ListItemText from 'material-ui/List'
import Typography from 'material-ui/Typography'
import deepOrange from 'material-ui/colors/deepOrange'
import deepPurple from 'material-ui/colors/deepPurple'

import {withStyles} from 'material-ui/styles'
const styles = {
  message: {
    padding: '0.5rem',
    // minHeight: 40,
  },
  avatar: {
    display: 'inline-block',
  },
  from: {
    width: 150,
    display: 'inline-block',
  },
  subject: {display: 'inline-block'},
  top: {
    borderTop: '1px solid #d3d3d3',
  },
  orangeAvatar: {
    width: 26,
    height: 25,
    fontSize: 14,
    // margin: '0 5px 0 0',
    // margin: 5,
    marginLeft: '.5rem',
    marginRight: '1rem',
    color: '#fff',
    backgroundColor: deepOrange[300],
  },
}

class Message extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    first: PropTypes.bool.isRequired,
  }

  render() {
    const classes = this.props.classes
    const {item, first} = this.props

    return (
      <div className={classNames(classes.message, first ? null : classes.top)}>
        <span className={classNames(classes.avatar)}>
          <Avatar className={classes.orangeAvatar}>F</Avatar>
        </span>
        <Typography className={classNames(classes.from)}>
          {item.from}
        </Typography>
        <Typography className={classNames(classes.subject)}>
          {item.subject}
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(Message)
