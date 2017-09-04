import React from 'react'
import PropTypes from 'prop-types'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'

import DrawerIcon from 'mdi-react/MenuIcon'

export const TitleBar = ({title, onOpenDrawer}) => {

  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        {onOpenDrawer && <IconButton>
          <DrawerIcon onClick={onOpenDrawer} />
        </IconButton>}
        {!onOpenDrawer && <IconButton disabled/>}
        <Typography type="title" color="inherit">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

TitleBar.propTypes = {
  onOpenDrawer: PropTypes.func,
  title: PropTypes.string
}
