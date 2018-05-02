import * as selectors from './selectors'
import { fromJS } from 'immutable';

describe('selectors', () => {
    test('selectors.selectLuke return luke', () => {
        const state = fromJS({
            luke: {
                name: 'Luke Skywalker',
                from: 'Swapi'
            }
        })

        expect(selectors.selectLuke(state)).toMatchSnapshot()
    })
})