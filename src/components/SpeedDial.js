/*eslint-disable react/no-set-state */

/**
 * Initial code is based on author below but modified by Robert Furr
 * speeddial - Speed dial button inspired by Google Material design
 *
 * @version v0.2.4
 * @homepage https://github.com/iliketomatoes/speeddial
 * @license MIT
 * @author Giancarlo Soverini
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Tooltip from "@material-ui/core/Tooltip";

export class SpeedDial extends Component {
  constructor(props) {
    super(props);
    this.state = { isMouseOver: false, tooltip: "" };
  }

  resetState() {
    this.setState({ isMouseOver: false, tooltip: "" });
  }

  isMouseOver() {
    return this.state.isMouseOver;
  }

  resetIsMouseOver() {
    this.setState({ ...this.state, isMouseOver: false });
  }

  setIsMouseOver() {
    this.setState({ ...this.state, isMouseOver: true });
  }

  tooltip() {
    return this.state.tooltip;
  }

  resetTooltip() {
    this.setState({ ...this.state, tooltip: "" });
  }

  setTooltip(tooltip) {
    this.setState({ ...this.state, tooltip: tooltip });
  }

  isMouseInside(x, y, rect) {
    return x > rect.left && x < rect.right && y > rect.top && y < rect.bottom;
  }

  handleMouseEnter(e) {
    const { onMouseEnter } = this.props;

    if (!this.isMouseOver()) {
      onMouseEnter && onMouseEnter(e, this);
      this.setIsMouseOver();
    }
  }

  handleMouseLeave(e) {
    const { onMouseLeave } = this.props;

    const rect = this._speeddial.getBoundingClientRect();
    const mouseInside = this.isMouseInside(e.clientX, e.clientY, rect);

    if (!mouseInside) {
      onMouseLeave && onMouseLeave(e, this);
      this.resetState();
    }
  }

  handleItemMouseEnter(item) {
    this.setTooltip(item.props["data-tooltip"]);
  }

  handleItemMouseLeave() {
    this.resetTooltip();
  }

  buildItems() {
    const { open, direction, tooltip, children } = this.props;

    const mini = children[0].props.mini;
    let top, right;
    if (direction === "left" || direction === "right") {
      top = mini ? -15 : -15;
      right = mini ? 3 : 11;
      if (tooltip.direction === "bottom") {
        top = mini ? 64 : 80;
      }
    } else {
      top = mini ? 22 : 30;
      right = mini ? 50 : 65;
      if (tooltip.direction === "right") {
        right = mini ? -45 : -45;
      }
    }
    let i = open ? 0 : children.length - 1;
    let o = open ? 1 : -1;

    return children.map((item, index) => {
      const delay = 0.05 * i + "s";
      i = i + o;
      const showTooltip = tooltip.showOnHover
        ? this.tooltip() === item.props["data-tooltip"]
        : true;

      return (
        <li
          onMouseEnter={e => this.handleItemMouseEnter(item)}
          onMouseLeave={() => this.handleItemMouseLeave()}
          key={"item" + index}
          style={{
            WebkitAnimationDelay: delay,
            animationDelay: delay
          }}
          className="speed-dial-option"
        >
          {item}
        </li>
      );
    });
  }

  calculateWidth(miniButton, miniItem, itemsCount) {
    const sizeOffset = miniButton ? 11 : 14;
    const sizeSeparator = miniItem ? 9 : 10;
    // const floatingActionButton = getMuiTheme().floatingActionButton;
    const floatingActionButton = { miniSize: 40, buttonSize: 56 };
    const sizeItem = miniItem
      ? floatingActionButton.miniSize
      : floatingActionButton.buttonSize;
    const sizeButton = miniButton
      ? floatingActionButton.miniSize
      : floatingActionButton.buttonSize;

    const buttonOffset = !miniButton && miniItem ? sizeOffset + 2 : sizeOffset;
    return (
      sizeButton +
      buttonOffset +
      itemsCount * sizeItem +
      (itemsCount - 1) * sizeSeparator
    );
  }

  render() {
    const {
      open,
      style,
      children,
      className,
      direction,
      speedDialElement
    } = this.props;

    const items = this.buildItems();
    const miniActions = children[0].props.mini;
    const miniSpeedDial = speedDialElement.props.mini;
    const visibleClassName = open ? "is-visible" : "is-hidden";
    const miniClassName = miniSpeedDial ? " speed-dial-small" : "";

    let divStyle = style;
    if (direction == "left" || direction == "right") {
      const divSize =
        this.calculateWidth(miniSpeedDial, miniActions, children.length) + "px";
      const textAlign = direction === "right" ? "left" : "right";
      divStyle = { ...style, textAlign: textAlign, width: divSize };
    }

    return (
      <div
        ref={ref => (this._speeddial = ref)}
        style={divStyle}
        className={className + miniClassName + " speed-dial-" + direction}
        onMouseEnter={e => this.handleMouseEnter(e)}
        onMouseLeave={e => this.handleMouseLeave(e)}
      >
        {(direction === "down" || direction === "right") && speedDialElement}
        <ul className={"speed-dial-list " + visibleClassName}>{items}</ul>
        {(direction === "up" || direction === "left") && speedDialElement}
      </div>
    );
  }
}

SpeedDial.propTypes = {
  open: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  direction: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  speedDialElement: PropTypes.node,
  tooltip: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

SpeedDial.defaultProps = {
  direction: "up",
  tooltip: {
    direction: "left",
    showOnHover: true
  }
};
