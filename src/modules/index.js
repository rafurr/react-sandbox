import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import view from './view'
import sort from './sort'
import once from './once'
import curry from './curry'
import counter from './counter'
import inbox from './inbox'

export default combineReducers({
  router: routerReducer,
  view,
  sort,
  once,
  curry,
  counter,
  inbox,
})
