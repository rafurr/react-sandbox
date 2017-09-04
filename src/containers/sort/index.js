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
import {insertionSortWithCallback} from '../../utils/sort'

import {
  openDrawer,
  closeDrawer
} from '../../modules/view'

import {
  beginSorting,
  endSorting,
  addStep,
  playSteps,
  reset,
  setSortedArray,
} from '../../modules/sort'

const mapStateToProps = state => ({
  sideDrawerOpen: state.view.sideDrawerOpen,
  sorting: state.sort.sorting,
  steps: state.sort.steps,
  play: state.sort.play,
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
  playSteps,
  setSortedArray
}, dispatch)

const styles = {
  container: {
    margin: 10
  },
  spacer: {
    marginRight: 10
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: orange[500]
  },
  blueAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: blue[500]
  },
  row: {
    display: 'flex',
    justifyContent: 'left'
  },
  label: {
    minWidth: 140
  },
  textField: {
    marginRight: 10,
    width: 300
  },
  step: {
    marginTop: 10,
    minHeight: 1
  },
}

class Sort extends Component {

  state = {
    validArray: true,
    unsortedArray: [0, 5, 1, 4, 2, 3],
    unsortedArrayStr: '[0, 5, 1, 4, 2, 3]'
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

  handlePlayClick = () => {
    this.logSteps(this.props.steps)
    this.props.playSteps()
  }

  arrayToString = (arr) => {
    return '['+arr.toString()+']'
  }

  makeString = (step) => {
    let str

    switch(step.type) {
      case 'before':
        str = `Before ${this.arrayToString(step.arr)}`
        break;
      case 'copy':
        str = `Copy:${step.item} From:${step.from} ${this.arrayToString(step.arr)}`
        break;
      case 'shift':
        str = `Shift:${step.item} From:${step.from} To:${step.to} >> ${this.arrayToString(step.arr)}`
        break;
      case 'insert':
        str = `Insert:${step.item} At:${step.at} >> ${this.arrayToString(step.arr)}`
        break;
      case 'after':
        str = `After ${this.arrayToString(step.arr)}`
        break;
      default:
        str = ''
    }

    return str
  }


  logSteps = (steps) => {
    steps.forEach(step => console.log(this.makeString(step)))
  }

  makeStep = (step, index) => {
    return <div key={'step'+index} className={this.props.classes.step}>{this.makeString(step)}</div>
  }

  render() {
    const classes = this.props.classes

    return (
      <div>
        <TitleBar title="Sort" onOpenDrawer={this.props.openDrawer} />

        <div className={classes.container}>
          <h1>Insertion Sort</h1>
          <TextField
            id="unsortedArray"
            label="Unsorted Array"
            className={classes.textField}
            value={this.state.unsortedArrayStr}
            onChange={this.handleUnsortedArrayChange}
            margin="normal"
          />
          <Button raised disabled={!this.state.validArray} onClick={this.handleSortClick}>Sort</Button>
          {this.state.validArray && <div className={classes.row}>
            <h3 className={classes.label}>Unsorted Array</h3>
            {this.state.unsortedArray.map((item, index) => <Avatar key={'unsorted'+index} className={classes.orangeAvatar}>{item.toString()}</Avatar>)}
          </div>}
          {this.props.sortedArray && <div className={classes.row}>
            <h3 className={classes.label}>Sorted Array</h3>
            {this.props.sortedArray.map((item, index) => <Avatar key={'sorted'+index} className={classes.blueAvatar}>{item.toString()}</Avatar>)}
          </div>}
          {this.props.steps && <Button raised onClick={this.handlePlayClick}>Show Steps</Button>}
          {this.props.play && this.props.steps.map((step, index) => this.makeStep(step, index))}
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
