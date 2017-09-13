import React from 'react'
import PropTypes from 'prop-types'

import List from 'material-ui/List'
import {ListItem, ListItemText} from 'material-ui/List'
import Drawer from 'material-ui/Drawer'

import HomeIcon from 'mdi-react/HomeOutlineIcon'
import SortIcon from 'mdi-react/SortAscendingIcon'
import OnceIcon from 'mdi-react/RepeatOnceIcon'
import CurryIcon from 'mdi-react/AltimeterIcon'
import CounterIcon from 'mdi-react/NumericIcon'
import AboutIcon from 'mdi-react/HelpIcon'
import BadLinkIcon from 'mdi-react/LinkOffIcon'

export const LeftDrawer = ({open, history, onClick, onRequestClose}) => {
  const sideList = (
    <div>
      <List>
        <ListItem button onClick={() => history.push('/')}>
          <HomeIcon /><ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => history.push('/sort')}>
          <SortIcon /><ListItemText primary="Sort" />
        </ListItem>
        <ListItem button onClick={() => history.push('/once')}>
          <OnceIcon /><ListItemText primary="Once" />
        </ListItem>
        <ListItem button onClick={() => history.push('/curry')}>
          <CurryIcon /><ListItemText primary="Curry" />
        </ListItem>
        <ListItem button onClick={() => history.push('/counter')}>
          <CounterIcon /><ListItemText primary="Counter" />
        </ListItem>
        <ListItem button onClick={() => history.push('/about-us')}>
          <AboutIcon /><ListItemText primary="About" />
        </ListItem>
        <ListItem button onClick={() => history.push('/bad-link')}>
          <BadLinkIcon /><ListItemText primary="Bad Link" />
        </ListItem>
      </List>
    </div>
  )

  return (
    <Drawer open={open} onRequestClose={onClick} onClick={onRequestClose}>
      {sideList}
    </Drawer>
  )
}

LeftDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  history: PropTypes.object,
  onClick: PropTypes.func,
  onRequestClose: PropTypes.func,
}
