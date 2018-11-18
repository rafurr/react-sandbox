import React, { Component } from "react";
import PropTypes from "prop-types";

import classNames from "classnames";

import Paper from "@material-ui/core/Paper";

import { withStyles } from "@material-ui/core/styles";

const styles = {
  list: {
    margin: "1.5rem"
  },
  expanded: {
    margin: "0.75rem -1.0rem 0.75rem -1.0rem"
  }
};

class ExpandableList extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    component: PropTypes.func.isRequired,
    componentProps: PropTypes.object,
    keyFn: PropTypes.func.isRequired,
    selectedItem: PropTypes.object,
    onItemClick: PropTypes.func
  };

  buildListItems(items, classes, expanded) {
    const { keyFn, onItemClick, component, componentProps } = this.props;

    const elements = items.map((item, index) => {
      return React.createElement(component, {
        ...componentProps,
        item,
        first: index === 0,
        expanded: expanded,
        key: keyFn(item),
        onClick: onItemClick
      });
    });

    return (
      <Paper className={classNames(expanded ? classes.expanded : "")}>
        {elements}
      </Paper>
    );
  }

  render() {
    const classes = this.props.classes;
    const { items, keyFn, selectedItem } = this.props;

    const selectedItemId = selectedItem ? keyFn(selectedItem) : -1;
    const expandedIndex = items.findIndex(
      item => keyFn(item) === selectedItemId
    );

    let elementsBefore, elementExpanded, elementsAfter;

    if (expandedIndex === -1) {
      elementsBefore = this.buildListItems(items, classes, false);
    } else {
      elementsBefore = this.buildListItems(
        items.slice(0, expandedIndex),
        classes,
        false
      );
      elementExpanded = this.buildListItems(
        items.slice(expandedIndex, expandedIndex + 1),
        classes,
        true
      );
      elementsAfter = this.buildListItems(
        items.slice(expandedIndex + 1),
        classes,
        false
      );
    }

    return (
      <div className={classes.list}>
        {elementsBefore}
        {elementExpanded}
        {elementsAfter}
      </div>
    );
  }
}

export default withStyles(styles)(ExpandableList);
