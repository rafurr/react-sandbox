import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {withStyles} from 'material-ui/styles'
import BottomNavigation, {BottomNavigationButton} from 'material-ui/BottomNavigation'

import {TitleBar, LeftDrawer} from '../../components'
import ExpandableList from '../../components/ExpandableList'
import Message from '../../components/Message'

import SortIcon from 'mdi-react/SortAscendingIcon'
import OnceIcon from 'mdi-react/RepeatOnceIcon'
import CurryIcon from 'mdi-react/AltimeterIcon'
import CounterIcon from 'mdi-react/NumericIcon'

import {openLeftDrawer, closeLeftDrawer} from '../../modules/view'
import {selectItem, deselectItem} from '../../modules/inbox'

import bundles from '../../mock/bundles'
// import contacts from '../../mock/contacts'

const mapStateToProps = state => ({
  leftDrawerOpen: state.view.leftDrawerOpen,
  selectedItem: state.inbox.selectedItem,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openLeftDrawer,
      closeLeftDrawer,
      selectItem,
      deselectItem,
    },
    dispatch
  )

const styles = {
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
    width: '100%',
    background: '#F5F5F5',
  },
  container: {},
  bottomNavigation: {
    borderTop: '1px solid #d3d3d3',
  },
  fixedBottom: {
    position: 'fixed',
    width: '100%',
    bottom: 0,
  },
  spacer: {
    marginRight: 10,
  },
}

class Home extends Component {
  componentDidMount() {
    const root = document.querySelector('#root')
    root.onclick = e => {
      e.target.id === 'root' && this.props.deselectItem()
    }
  }

  handleNavigationChange = route => {
    this.props.history.push(route)
  }

  handleClick = () => {
    this.props.deselectItem()
  }

  handleItemClick = (e, item) => {
    e.stopPropagation()
    item.read = true
    this.props.selectItem(item)
  }

  render() {
    const classes = this.props.classes

    const {selectedItem} = this.props

    const currentBundle = bundles[0]

    return (
      <div onClick={this.handleClick}>
        <div className={classes.fixedTop}>
          <TitleBar title="Home" onOpenDrawer={this.props.openLeftDrawer} />
        </div>

        <div className={classes.scrollableContainer}>
          <div className={classes.container} />
          <ExpandableList
            items={currentBundle.messages}
            keyFn={i => i.id}
            onItemClick={this.handleItemClick}
            selectedItem={selectedItem}
            component={Message}
            componentProps={{}}
          />

          <LeftDrawer
            open={this.props.leftDrawerOpen}
            history={this.props.history}
            onRequestClose={this.props.closeLeftDrawer}
            onClick={this.props.closeLeftDrawer}
          />
        </div>

        <div className={classes.fixedBottom}>
          <BottomNavigation
            value={-1}
            onChange={this.handleNavigationChange}
            showLabels
            className={classes.bottomNavigation}>
            <BottomNavigationButton
              label="Sort"
              onClick={() => this.handleNavigationChange('/sort')}
              icon={<SortIcon />}
            />
            <BottomNavigationButton
              label="Once"
              onClick={() => this.handleNavigationChange('/once')}
              icon={<OnceIcon />}
            />
            <BottomNavigationButton
              label="Curry"
              onClick={() => this.handleNavigationChange('/curry')}
              icon={<CurryIcon />}
            />
            <BottomNavigationButton
              label="Counter"
              onClick={() => this.handleNavigationChange('/counter')}
              icon={<CounterIcon />}
            />
          </BottomNavigation>
        </div>

      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Home)
)
