import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducer'

const store = createStore(reducer, applyMiddleware(thunk))

export const getDispatch = () => store.dispatch

export default store