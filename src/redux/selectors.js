import * as actions from './actions'
import paths from './paths'
import { getDispatch } from './store'

export const selectLuke = (state) => {
    const luke = state.getIn(paths.luke)
    console.log('selector', luke)
    if (luke === undefined) {
        getDispatch()(actions.fetchLuke())
        return false
    }

    return luke.toJS()
}