import React from "react";
import PropTypes from "prop-types";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";

import HomeIcon from "mdi-react/HomeOutlineIcon";
import SortIcon from "mdi-react/SortAscendingIcon";
import OnceIcon from "mdi-react/RepeatOnceIcon";
import CurryIcon from "mdi-react/AltimeterIcon";
import CounterIcon from "mdi-react/NumericIcon";
import AboutIcon from "mdi-react/HelpIcon";
import BadLinkIcon from "mdi-react/LinkOffIcon";

export const LeftDrawer = ({ open, history, onClick, onRequestClose }) => {
  const icons = {
    home: <HomeIcon />,
    sort: <SortIcon />,
    once: <OnceIcon />,
    curry: <CurryIcon />,
    counter: <CounterIcon />,
    about: <AboutIcon />,
    bad: <BadLinkIcon />
  };

  const makeItem = (url, text, icon) => (
    <ListItem button onClick={() => history.push(url)}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );

  return (
    <Drawer open={open} onClick={onRequestClose}>
      <div>
        <List>{makeItem("/", "Home", icons.home)}</List>
        <List>{makeItem("/sort", "Sort", icons.sort)}</List>
        <List>{makeItem("/once", "Once", icons.once)}</List>
        <List>{makeItem("/curry", "Curry", icons.curry)}</List>
        <List>{makeItem("/counter", "Counter", icons.counter)}</List>
        <List>{makeItem("/about", "About", icons.about)}</List>
        <List>{makeItem("/bad", "Bad Link", icons.bad)}</List>
      </div>
    </Drawer>
  );
};

LeftDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  history: PropTypes.object,
  onClick: PropTypes.func,
  onRequestClose: PropTypes.func
};
