import React, {Component} from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import classNames from 'classnames'

import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import {withStyles} from 'material-ui/styles'

import grey from 'material-ui/colors/grey'
import deepOrange from 'material-ui/colors/deepOrange'

const LightFontColor = grey[600]

const styles = {
  message: {
    padding: '0.5rem',
    cursor: 'pointer',
  },
  avatar: {
    display: 'inline-block',
  },
  from: {
    width: 150,
    display: 'inline-block',
    fontWeight: 'bold',
  },
  subject: {
    display: 'inline-block',
    fontWeight: 'bold',
  },
  received: {
    float: 'right',
    color: LightFontColor,
  },
  content: {
    display: 'inline-block',
  },
  top: {
    borderTop: '1px solid #d3d3d3',
  },
  avatarSpacer: {
    width: 26,
    height: 26,
    display: 'inline-block',
    marginLeft: '.5rem',
    marginRight: '1rem',
  },
  orangeAvatar: {
    width: 26,
    height: 26,
    fontSize: 14,
    marginLeft: '.5rem',
    marginRight: '1rem',
    color: '#fff',
    backgroundColor: deepOrange[300],
  },
  read: {
    fontWeight: 'normal',
  },
}

class Message extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    first: PropTypes.bool.isRequired,
    expanded: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
  }

  render() {
    const classes = this.props.classes
    const {item, first, expanded, onClick} = this.props
    const received = moment(item.received).format('HH:mm A')
    const read = item.read ? classes.read : null

    return (
      <div
        className={classNames(classes.message, first ? null : classes.top)}
        onClick={onClick ? e => onClick(e, item) : () => {}}>
        <span className={classNames(classes.avatar)}>
          <Avatar className={classes.orangeAvatar}>F</Avatar>
        </span>
        <Typography className={classNames(classes.from, read)}>
          {item.from}
        </Typography>
        <Typography className={classNames(classes.subject, read)}>
          {item.subject}
        </Typography>
        {expanded &&
          <Typography className={classNames(classes.received)}>
            {received}
          </Typography>}
        {expanded &&
          <div>
            <span className={classNames(classes.avatarSpacer)} />
            <Typography className={classNames(classes.content)}>
              {item.content}
            </Typography>
          </div>}
      </div>
    )
  }
}

export default withStyles(styles)(Message)
