import React, { Component } from "react";
import PropTypes from "prop-types";

import moment from "moment";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";

import IconButton from "@material-ui/core/IconButton";
import PinIcon from "mdi-react/PinIcon";
import SnoozeIcon from "mdi-react/ClockIcon";
import DeleteIcon from "mdi-react/DeleteIcon";
import MarkIcon from "mdi-react/CheckIcon";
import MoveIcon from "mdi-react/DotsVerticalIcon";
import Tooltip from "@material-ui/core/Tooltip";

import grey from "@material-ui/core/colors/grey";
import deepOrange from "@material-ui/core/colors/deepOrange";

const LightFontColor = grey[600];

const styles = theme => ({
  root: theme.typography.body2,
  message: {
    padding: "0.5rem 1em 0.5rem 0.5rem",
    cursor: "pointer"
  },
  center: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  },
  primaryLine: {},
  avatar: {
    display: "inline-block",
    marginTop: 4
  },
  from: {
    display: "inline-block",
    fontWeight: "bold",
    verticalAlign: "top",
    marginTop: 4
  },
  subject: {
    display: "inline-block",
    fontWeight: "bold",
    marginTop: 4
  },
  received: {
    width: "100%",
    display: "inline-block",
    fontWeight: "normal",
    color: LightFontColor,
    marginTop: 4
  },
  receivedTime: {
    float: "right",
    paddingRight: 20
  },
  content: {
    display: "inline-block",
    fontWeight: "normal",
    marginTop: 4
  },
  top: {
    borderTop: "1px solid #d3d3d3"
  },
  avatarSpacer: {
    width: 26,
    height: 26,
    display: "inline-block",
    marginLeft: ".5rem",
    marginRight: "1rem"
  },
  orangeAvatar: {
    width: 26,
    height: 26,
    fontSize: 14,
    marginLeft: ".5rem",
    marginRight: "1rem",
    color: "#fff",
    backgroundColor: deepOrange[300]
  },
  read: {
    fontWeight: "normal"
  },
  toolbar: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    display: "inline-block",
    width: "100%",
    fontWeight: "normal",
    height: "32px",
    minHeight: "32px"
  },
  toolbarButton: {
    fill: "grey",
    width: "32px",
    height: "32px"
  }
});

class Message extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    first: PropTypes.bool.isRequired,
    expanded: PropTypes.bool.isRequired,
    onClick: PropTypes.func
  };

  render() {
    const classes = this.props.classes;
    const { item, first, expanded, onClick } = this.props;
    const received = moment(item.received).format("HH:mm A");
    const read = item.read ? classes.read : null;

    const subjectClasses = expanded
      ? classNames(
          "col-lg-8",
          "col-md-6",
          "col-sm-6",
          "col-xs-4",
          classes.center
        )
      : classNames(
          "col-lg-10",
          "col-md-9",
          "col-sm-9",
          "col-xs-8",
          classes.center
        );

    //todo: Tooltip below not working yet, Material-UI beta?

    const showToolBar = false; //expanded

    return (
      <div
        className={classNames(
          classes.root,
          classes.message,
          first ? null : classes.top
        )}
        onClick={onClick ? e => onClick(e, item) : () => {}}
      >
        <div className={classNames("row", classes.primaryLine)}>
          <div
            className={classNames(
              "col-lg-2",
              "col-md-3",
              "col-sm-3",
              "col-xs-4",
              classes.center
            )}
          >
            <span className={classNames(classes.avatar)}>
              <Avatar className={classes.orangeAvatar}>F</Avatar>
            </span>
            <span className={classNames(classes.from, classes.center, read)}>
              {item.from}
            </span>
          </div>
          <div className={subjectClasses}>
            <span className={classNames(classes.subject, read)}>
              {item.subject}
            </span>
          </div>
          {showToolBar && (
            <div
              className={classNames(
                "col-lg-2",
                "col-md-3",
                "col-sm-3",
                "col-xs-4"
              )}
            >
              <Toolbar disableGutters className={classNames(classes.toolbar)}>
                <IconButton className={classNames(classes.toolbarButton)}>
                  <PinIcon />
                </IconButton>
                <IconButton className={classNames(classes.toolbarButton)}>
                  <SnoozeIcon />
                </IconButton>
                <Tooltip title="Delete" placement="bottom">
                  <IconButton
                    aria-label="Delete"
                    className={classNames(classes.toolbarButton)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <IconButton className={classNames(classes.toolbarButton)}>
                  <MarkIcon />
                </IconButton>
                <IconButton className={classNames(classes.toolbarButton)}>
                  <MoveIcon />
                </IconButton>
              </Toolbar>
            </div>
          )}
        </div>
        {expanded && (
          <div className={classNames("row", classes.primaryLine)}>
            <div
              className={classNames(
                "col-lg-10",
                "col-md-9",
                "col-sm-9",
                "col-xs-8",
                classes.center
              )}
            >
              <span className={classNames(classes.avatarSpacer)} />
              <span className={classNames(classes.content, classes.center)}>
                {item.content}
              </span>
            </div>
            <div
              className={classNames(
                "col-lg-2",
                "col-md-3",
                "col-sm-3",
                "col-xs-4",
                classes.center
              )}
            >
              <span className={classNames(classes.received, classes.center)}>
                <span className={classNames(classes.receivedTime)}>
                  {received}
                </span>
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Message);
