import { Map } from 'immutable'

import paths from './paths'
import { types } from './actions'

export default (state = Map(), action) => {
    const { type, payload } = action

    switch (type) {
        case types.LUKE:
            return state.mergeIn(paths.luke, payload)
        default:
            return state
    }
}