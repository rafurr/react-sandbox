import React from "react";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
// import Button from '@material-ui/core/Button';

import DrawerIcon from "mdi-react/MenuIcon";

export const TitleBar = ({ title, onOpenDrawer }) => {
  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        {onOpenDrawer && (
          <IconButton>
            <DrawerIcon onClick={onOpenDrawer} />
          </IconButton>
        )}
        {!onOpenDrawer && <IconButton disabled />}
        <Typography variant="h6" color="inherit">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

TitleBar.propTypes = {
  onOpenDrawer: PropTypes.func,
  title: PropTypes.string
};
