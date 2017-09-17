import React, {Component} from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'

import Paper from 'material-ui/Paper'

import {withStyles} from 'material-ui/styles'
const styles = {
  list: {
    margin: '2.0rem',
  },
  expanded: {
    margin: '1.0rem -1.0rem 1.0rem -1.0rem',
  },
}

class ExpandableList extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    component: PropTypes.func.isRequired,
    componentProps: PropTypes.object,
    keyFn: PropTypes.func.isRequired,
  }

  buildListItems(items, classes, expanded) {
    const {keyFn, component, componentProps} = this.props

    const elements = items.map((item, index) => {
      return React.createElement(component, {
        ...componentProps,
        item,
        first: index === 0,
        expanded: expanded,
        key: keyFn(item),
      })
    })

    return (
      <Paper className={classNames(expanded ? classes.expanded : '')}>
        {elements}
      </Paper>
    )
  }

  render() {
    const classes = this.props.classes
    const {items} = this.props

    const expandedIndex = 2

    let elementsBefore, elementExpanded, elementsAfter

    if (expandedIndex === -1) {
      elementsBefore = this.buildListItems(items, classes, false)
    } else {
      elementsBefore = this.buildListItems(
        items.slice(0, expandedIndex),
        classes,
        false
      )
      elementExpanded = this.buildListItems(
        items.slice(expandedIndex, expandedIndex + 1),
        classes,
        true
      )
      elementsAfter = this.buildListItems(
        items.slice(expandedIndex + 1),
        classes,
        false
      )
    }

    return (
      <div className={classes.list}>
        {elementsBefore}
        {elementExpanded}
        {elementsAfter}
      </div>
    )
  }
}

export default withStyles(styles)(ExpandableList)
