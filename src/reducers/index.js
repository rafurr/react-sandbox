import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import view from './view'
import sort from './sort'
import once from './once'
import curry from './curry'
import counter from './counter'
import inbox from './inbox'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  view,
  sort,
  once,
  curry,
  counter,
  inbox,
})

export default rootReducer
