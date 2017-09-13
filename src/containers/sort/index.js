import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import animation from '../../images/insertion-sort.gif'

import {withStyles} from 'material-ui/styles'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Avatar from 'material-ui/Avatar'
import orange from 'material-ui/colors/orange'
import blue from 'material-ui/colors/blue'

import {TitleBar, LeftDrawer} from '../../components'
import {insertionSortWithCallback} from '../../utils/sort'

import {openLeftDrawer, closeLeftDrawer} from '../../modules/view'

import {
  beginSorting,
  endSorting,
  addStep,
  toggleSteps,
  toggleAnimation,
  toggleDescription,
  reset,
  setSortedArray,
} from '../../modules/sort'

const mapStateToProps = state => ({
  leftDrawerOpen: state.view.leftDrawerOpen,
  sorting: state.sort.sorting,
  steps: state.sort.steps,
  showSteps: state.sort.showSteps,
  showAnimation: state.sort.showAnimation,
  showDescription: state.sort.showDescription,
  unsortedArray: state.sort.unsortedArray,
  sortedArray: state.sort.sortedArray,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openLeftDrawer,
      closeLeftDrawer,
      beginSorting,
      endSorting,
      addStep,
      reset,
      toggleSteps,
      toggleAnimation,
      toggleDescription,
      setSortedArray,
    },
    dispatch
  )

const styles = {
  animation: {
    display: 'block',
  },
  fixedTop: {
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 1000,
  },
  scrollableContainer: {
    top: 0,
    marginTop: 56,
    marginBottom: 56,
    position: 'absolute',
  },
  container: {
    margin: 10,
  },
  spacer: {
    marginRight: 10,
  },
  title: {
    marginTop: 5,
    marginBottom: 5,
    cursor: 'pointer',
  },
  sourceCode: {
    marginTop: 0,
    marginBottom: 0,
  },
  code0: {
    display: 'block',
  },
  code1: {
    display: 'block',
    marginLeft: 15,
  },
  code2: {
    display: 'block',
    marginLeft: 30,
  },
  code3: {
    display: 'block',
    marginLeft: 45,
  },
  orangeAvatar: {
    width: 35,
    height: 35,
    fontSize: 16,
    margin: '0 5px 0 0',
    color: '#fff',
    backgroundColor: orange[500],
  },
  blueAvatar: {
    width: 35,
    height: 35,
    fontSize: 16,
    margin: '0 5px 0 0',
    color: '#fff',
    backgroundColor: blue[500],
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
    width: 300,
  },
  step: {
    marginTop: 10,
    minHeight: 1,
  },
  showHideSteps: {
    width: 160,
    marginRight: 10,
  },
  showHideAnimation: {
    width: 160,
    marginRight: 10,
  },
  logSteps: {
    width: 160,
  },
  reset: {
    marginLeft: 10,
  },
}

class Sort extends Component {
  state = {
    validArray: true,
    unsortedArray: [5, 1, 4, 2, 3],
    unsortedArrayStr: '[5, 1, 4, 2, 3]',
    // unsortedArray: [6, 5, 3, 1, 8, 7, 2, 4],
    // unsortedArrayStr: '[6, 5, 3, 1, 8, 7, 2, 4]'
  }

  componentWillUnmount() {
    this.reset()
  }

  handleUnsortedArrayChange = event => {
    let str = event.target.value
    let validArray = false
    try {
      validArray = JSON.parse(str)
    } catch (e) {}
    if (validArray) {
      if (validArray.length > 0 && validArray.length <= 10) {
        validArray.forEach(
          item => (validArray = typeof item === 'number' ? validArray : false)
        )
      } else {
        validArray = false
      }
    }
    this.resetGif('animation')
    this.setState({
      validArray: validArray,
      unsortedArray: validArray,
      unsortedArrayStr: str,
    })

    this.props.reset()
  }

  sortCallback = step => {
    this.props.addStep(step)
  }

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

  handleShowHideAnimationClick = () => {
    this.resetGif('animation')
    this.props.toggleAnimation()
  }

  handleLogStepsClick = () => {
    this.logSteps(this.props.steps)
  }

  handleResetClick = () => {
    this.reset()
  }

  reset = () => {
    this.resetGif('animation')
    this.setState({
      validArray: true,
      unsortedArray: [5, 1, 4, 2, 3],
      unsortedArrayStr: '[5, 1, 4, 2, 3]',
      // unsortedArray: [6, 5, 3, 1, 8, 7, 2, 4],
      // unsortedArrayStr: '[6, 5, 3, 1, 8, 7, 2, 4]'
    })

    this.props.reset()
  }

  arrayToString = arr => {
    return '[' + arr.toString() + ']'
  }

  makeString = step => {
    let str

    switch (step.type) {
      case 'before':
        str = `Unsorted ${this.arrayToString(step.arr)}`
        break
      case 'copy':
        str = `Copy ${step.item} From ${step.from} \u27f8 ${this.arrayToString(
          step.arr
        )}`
        break
      case 'shift':
        str = `Shift ${step.item} From ${step.from} To ${step.to} \u27f9 ${this.arrayToString(
          step.arr
        )}`
        break
      case 'insert':
        str = `Insert ${step.item} At ${step.at} \u27f9 ${this.arrayToString(
          step.arr
        )}`
        break
      case 'after':
        str = `Sorted ${this.arrayToString(step.arr)}`
        break
      default:
        str = ''
    }

    return str
  }

  logSteps = steps => {
    console.clear()
    steps.forEach(step => console.log(this.makeString(step)))
  }

  makeStep = (step, index) => {
    return (
      <div key={'step' + index} className={this.props.classes.step}>
        {this.makeString(step)}
      </div>
    )
  }

  makeSourceLine = (line, index, classes) => {
    const lineClass = line.startsWith('      ')
      ? classes.code3
      : line.startsWith('    ')
        ? classes.code2
        : line.startsWith('  ') ? classes.code1 : classes.code0

    return <code key={'line' + index} className={lineClass}>{line}</code>
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
      '}',
    ]

    return (
      <p>
        {lines.map((line, index) => this.makeSourceLine(line, index, classes))}
      </p>
    )
  }

  resetGif = id => {
    // reset an animated gif to start at first image without reloading it from server.
    // Note: if you have the same image on the page more than ones, they all reset.
    const img = document.getElementById(id)
    if (img) {
      // let imageUrl = img.src
      img.class = ''
      img.src = ''
      // img.src = imageUrl
    }
  }

  render() {
    const classes = this.props.classes

    let showAnimation = false
    if (this.props.steps) {
      showAnimation =
        [6, 5, 3, 1, 8, 7, 2, 4].toString() ===
        this.state.unsortedArray.toString()
    }

    const propsShowAnimation = Boolean(this.props.showAnimation % 2)

    return (
      <div>
        <div className={classes.fixedTop}>
          <TitleBar title="Sort" onOpenDrawer={this.props.openLeftDrawer} />
        </div>

        <div className={classes.scrollableContainer}>
          <div className={classes.container}>
            <h2
              className={classes.title}
              onClick={this.handleToggleDescriptionClick}>
              Insertion Sort
            </h2>
            {this.props.showDescription &&
              <div>
                <p>
                  Insertion sort iterates, consuming one input element each
                  repetition, and growing a sorted output list. At each
                  iteration, insertion sort removes one element from the input
                  data, finds the location it belongs within the sorted list,
                  and inserts it there. It repeats until no input elements
                  remain.
                </p>
                <p>
                  Enter array [6, 5, 3, 1, 8, 7, 2, 4] to see an animated
                  demonstration of the algorithm.
                </p>
                <h4 className={classes.sourceCode}>Source Code</h4>
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
              <Button
                raised
                disabled={!this.state.validArray}
                onClick={this.handleSortClick}>
                Sort
              </Button>
              <Button
                raised
                className={classes.reset}
                onClick={this.handleResetClick}>
                Reset
              </Button>
            </div>

            {this.state.validArray &&
              <div className={classes.row}>
                <h4 className={classes.label}>Unsorted Array</h4>
              </div>}
            {this.state.validArray &&
              <div className={classes.row}>
                {this.state.unsortedArray.map((item, index) =>
                  <Avatar
                    key={'unsorted' + index}
                    className={classes.orangeAvatar}>
                    {item.toString()}
                  </Avatar>
                )}
              </div>}

            {this.props.sortedArray &&
              <div className={classes.row}>
                <h4 className={classes.label}>Sorted Array</h4>
              </div>}
            {this.props.sortedArray &&
              <div className={classes.row}>
                {this.props.sortedArray.map((item, index) =>
                  <Avatar key={'sorted' + index} className={classes.blueAvatar}>
                    {item.toString()}
                  </Avatar>
                )}
              </div>}

            {showAnimation &&
              <Button
                raised
                className={classes.showHideAnimation}
                onClick={this.handleShowHideAnimationClick}>
                {propsShowAnimation ? 'Hide Animation' : 'Show Animation'}
              </Button>}
            {this.props.steps &&
              <Button
                raised
                className={classes.showHideSteps}
                onClick={this.handleShowHideStepsClick}>
                {this.props.showSteps ? 'Hide Steps' : 'Show Steps'}
              </Button>}
            {this.props.steps &&
              <Button
                raised
                className={classes.logSteps}
                onClick={this.handleLogStepsClick}>
                Log Steps
              </Button>}
            {propsShowAnimation &&
              <img
                className={classes.animation}
                id="animation"
                src={animation}
                alt="Animation"
              />}
            {this.props.showSteps &&
              this.props.steps.map((step, index) => this.makeStep(step, index))}
          </div>
        </div>

        <LeftDrawer
          open={this.props.leftDrawerOpen}
          history={this.props.history}
          onRequestClose={this.props.closeLeftDrawer}
          onClick={this.props.closeLeftDrawer}
        />

      </div>
    )
  }
}

Sort.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Sort)
)
