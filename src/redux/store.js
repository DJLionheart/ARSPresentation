import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import reducer from './reducer'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export const getDispatch = () => store.dispatch

export default store