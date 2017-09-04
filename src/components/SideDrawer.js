import React from 'react'
import PropTypes from 'prop-types'

import List from 'material-ui/List'
import { ListItem, ListItemText } from 'material-ui/List'
import Drawer from 'material-ui/Drawer'

export const SideDrawer = ({open, history, onClick, onRequestClose}) => {
  const sideList = (
    <div>
      <List>
        <ListItem button onClick={() => history.push('/')}><ListItemText primary="Home"/></ListItem>
        <ListItem button onClick={() => history.push('/sort')}><ListItemText primary="Sort"/></ListItem>
        <ListItem button onClick={() => history.push('/once')}><ListItemText primary="Once"/></ListItem>
        <ListItem button onClick={() => history.push('/curry')}><ListItemText primary="Curry"/></ListItem>
        <ListItem button onClick={() => history.push('/counter')}><ListItemText primary="Counter"/></ListItem>
        <ListItem button onClick={() => history.push('/about-us')}><ListItemText primary="About"/></ListItem>
        <ListItem button onClick={() => history.push('/bad-link')}><ListItemText primary="Bad Link"/></ListItem>
      </List>
    </div>
  )

  return (
    <Drawer
      open={open}
      onRequestClose={onClick}
      onClick={onRequestClose}>
      {sideList}
    </Drawer>
  )
}

SideDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  history: PropTypes.object,
  onClick: PropTypes.func,
  onRequestClose: PropTypes.func
}
