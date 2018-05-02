import reducer from './reducer'
import { types } from './actions'

describe('reducer', () => {
    test('reducer returns luke', () => {
        const action = {
            type: types.LUKE,
            payload: {
                name: 'Luke Skywalker',
                from: 'Swapi'
            }
        }

        expect(reducer(undefined, action)).toMatchSnapshot()
    })
})