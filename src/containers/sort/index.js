import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar'
import orange from 'material-ui/colors/orange'
import blue from 'material-ui/colors/blue'

import {TitleBar, SideDrawer} from '../../components'
import {insertionSort, insertionSortWithCallback} from '../../utils/sort'

import {
  openDrawer,
  closeDrawer
} from '../../modules/view'

import {
  beginSorting,
  endSorting,
  addStep,
  toggleSteps,
  toggleDescription,
  reset,
  setSortedArray,
} from '../../modules/sort'

const mapStateToProps = state => ({
  sideDrawerOpen: state.view.sideDrawerOpen,
  sorting: state.sort.sorting,
  steps: state.sort.steps,
  showSteps: state.sort.showSteps,
  showDescription: state.sort.showDescription,
  unsortedArray: state.sort.unsortedArray,
  sortedArray: state.sort.sortedArray
})

const mapDispatchToProps = dispatch => bindActionCreators({
  openDrawer,
  closeDrawer,
  beginSorting,
  endSorting,
  addStep,
  reset,
  toggleSteps,
  toggleDescription,
  setSortedArray
}, dispatch)

const styles = {
  container: {
    margin: 10
  },
  spacer: {
    marginRight: 10
  },
  code: {
    display: 'block'
  },
  code0: {
    display: 'block'
  },
  code1: {
    display: 'block',
    marginLeft: 15
  },
  code2: {
    display: 'block',
    marginLeft: 30
  },
  code3: {
    display: 'block',
    marginLeft: 45
  },
  title: {
    marginTop: 5,
    marginBottom: 5,
    cursor: 'pointer'
  },
  description: {},
  orangeAvatar: {
    width: 35,
    height: 35,
    fontSize: 16,
    margin: '0 5px 0 0',
    color: '#fff',
    backgroundColor: orange[500]
  },
  blueAvatar: {
    width: 35,
    height: 35,
    fontSize: 16,
    margin: '0 5px 0 0',
    color: '#fff',
    backgroundColor: blue[500]
  },
  titleRow: {
    display: 'flex',
    marginBottom: 1,
  },
  inputRow: {
    marginBottom: 10,
  },
  row: {
    display: 'flex',
    justifyContent: 'left',
    marginBottom: 10,
  },
  label: {
    minWidth: 140,
    marginTop: 1,
    marginBottom: 1,
  },
  textField: {
    marginRight: 10,
    width: 300
  },
  step: {
    marginTop: 10,
    minHeight: 1
  },
  showHideSteps: {
    width: 150
  },
  logSteps: {
    width: 150,
    marginLeft: 10
  },
  reset: {
    marginLeft: 10
  },
}

class Sort extends Component {

  state = {
    validArray: true,
    unsortedArray: [5, 1, 4, 2, 3],
    unsortedArrayStr: '[5, 1, 4, 2, 3]'
  }

  handleUnsortedArrayChange = event => {
    let str = event.target.value
    let validArray = false
    try {validArray = JSON.parse(str)} catch(e) {}
    if (validArray) {
      if (validArray.length > 0 && validArray.length <= 10) {
        validArray.forEach(item => validArray = typeof item === 'number' ? validArray : false)
      } else {
        validArray = false
      }
    }
    this.setState({
      validArray: validArray,
      unsortedArray: validArray,
      unsortedArrayStr: str
    })

    this.props.reset()
  }

  sortCallback = (step) => {
    this.props.addStep(step)
  }

  // let arr = [5, 3, 1, 2, 4]
  // let arr = [6, 5, 3, 1, 8, 7, 2, 4]
  handleSortClick = () => {
    let arr = this.state.unsortedArray.slice(0)

    this.props.beginSorting()
    this.props.addStep({type: 'before', arr: arr.slice(0)})
    this.props.addStep({type: 'spacer'})
    insertionSortWithCallback(arr, this.sortCallback)
    this.props.addStep({type: 'after', arr: arr.slice(0)})
    this.props.endSorting()

    this.props.setSortedArray(arr)
  }

  handleToggleDescriptionClick = () => {
    this.props.toggleDescription()
  }

  handleShowHideStepsClick = () => {
    this.props.toggleSteps()
  }

  handleLogStepsClick = () => {
    this.logSteps(this.props.steps)
  }

  handleResetClick = () => {
    this.setState({
      validArray: true,
      unsortedArray: [5, 1, 4, 2, 3],
      unsortedArrayStr: '[5, 1, 4, 2, 3]'
    })

    this.props.reset()
  }

  arrayToString = (arr) => {
    return '['+arr.toString()+']'
  }

  makeString = (step) => {
    let str

    switch(step.type) {
      case 'before':
        str = `Unsorted ${this.arrayToString(step.arr)}`
        break;
      case 'copy':
        str = `Copy ${step.item} From ${step.from} \u27f8 ${this.arrayToString(step.arr)}`
        break;
      case 'shift':
        str = `Shift ${step.item} From ${step.from} To ${step.to} \u27f9 ${this.arrayToString(step.arr)}`
        break;
      case 'insert':
        str = `Insert ${step.item} At ${step.at} \u27f9 ${this.arrayToString(step.arr)}`
        break;
      case 'after':
        str = `Sorted ${this.arrayToString(step.arr)}`
        break;
      default:
        str = ''
    }

    return str
  }


  logSteps = (steps) => {
    console.clear()
    steps.forEach(step => console.log(this.makeString(step)))
  }

  makeStep = (step, index) => {
    return <div key={'step'+index} className={this.props.classes.step}>{this.makeString(step)}</div>
  }

  makeSourceLine = (line, index, classes) => {
    const lineClass = line.startsWith("      ")
      ? classes.code3
      : line.startsWith("    ")
        ? classes.code2
        : line.startsWith("  ") ? classes.code1 : classes.code0;

    return (
      <code key={'line'+index} className={lineClass}>{line}</code>
    )
  }

  makeSource = () => {
    const classes = this.props.classes

    const lines = [
      'insertionSort = (arr) => {',
      '  const len = arr.length',
      '  for (let i = 1; i < len; i++) {',
      '    // Copy of the current element',
      '    const tmp = arr[i]',
      '    // Check through the sorted part',
      '    // Compare with the number in tmp',
      '    // If larger, shift the number',
      '    let j = i - 1',
      '    for (j; j >= 0 && (arr[j] > tmp); j--) {',
      '      // Shift the number',
      '      arr[j + 1] = arr[j]',
      '    }',
      '    // Insert the copied number',
      '    // At the correct position in sorted part',
      '    arr[j + 1] = tmp',
      '  }',
      '}'
    ]

    return (
      <p>
        {lines.map((line, index) => this.makeSourceLine(line, index, classes))}
      </p>
    )
  }

  render() {
    window.xxx = insertionSort
    const classes = this.props.classes

    return (
      <div>
        <TitleBar title="Sort" onOpenDrawer={this.props.openDrawer} />

        <div className={classes.container}>
          <h2 className={classes.title} onClick={this.handleToggleDescriptionClick}>Insertion Sort</h2>
          {this.props.showDescription && <div>
            <p>Insertion sort iterates, consuming one input element each repetition, and growing a sorted output list. At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list, and inserts it there. It repeats until no input elements remain.</p>
            {this.makeSource()}
          </div>}
          <div className={classes.inputRow}>
            <TextField
              id="unsortedArray"
              label="Unsorted Array"
              className={classes.textField}
              value={this.state.unsortedArrayStr}
              onChange={this.handleUnsortedArrayChange}
              margin="normal"
            />
            <Button raised disabled={!this.state.validArray} onClick={this.handleSortClick}>Sort</Button>
            <Button raised className={classes.reset} onClick={this.handleResetClick}>Reset</Button>
          </div>

          {this.state.validArray && <div className={classes.row}>
            <h4 className={classes.label}>Unsorted Array</h4>
          </div>}
          {this.state.validArray && <div className={classes.row}>
            {this.state.unsortedArray.map((item, index) => <Avatar key={'unsorted'+index} className={classes.orangeAvatar}>{item.toString()}</Avatar>)}
          </div>}

          {this.props.sortedArray && <div className={classes.row}>
            <h4 className={classes.label}>Sorted Array</h4>
          </div>}
          {this.props.sortedArray && <div className={classes.row}>
            {this.props.sortedArray.map((item, index) => <Avatar key={'sorted'+index} className={classes.blueAvatar}>{item.toString()}</Avatar>)}
          </div>}

          {this.props.steps && <Button raised className={classes.showHideSteps} onClick={this.handleShowHideStepsClick}>{this.props.showSteps ? 'Hide Steps' : 'Show Steps'}</Button>}
          {this.props.steps && <Button raised className={classes.logSteps} onClick={this.handleLogStepsClick}>Log Steps</Button>}
          {this.props.showSteps && this.props.steps.map((step, index) => this.makeStep(step, index))}
        </div>

        <SideDrawer
          open={this.props.sideDrawerOpen}
          history={this.props.history}
          onRequestClose={this.props.closeDrawer}
          onClick={this.props.closeDrawer} />

      </div>
    )
  }
}

Sort.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Sort))
