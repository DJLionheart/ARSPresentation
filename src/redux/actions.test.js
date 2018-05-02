import nock from 'nock'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { Map } from 'immutable'

import * as actions from './actions'

describe('actions', () => {
    const mockStore = configureStore([thunk])
    let store
    const state = Map()
    beforeEach(() => {
        store = mockStore(state)
    })

    afterEach(() => {
        store.clearActions()
        nock.cleanAll()
    })

    test('action.setLuke', () => {
        const payload = {
            name: 'Luke Skywaler',
            from: 'Swapi'
        }

        expect(actions.setLuke(payload)).toMatchSnapshot()
    })

    test('actions.fetchLuke', async () => {
        const response = {
            name: 'Luke Skywaler',
            from: 'Swapi'
        }

        nock('https://swapi.co/api')
            .get('/people/1')
            .reply(200, response)

        await store.dispatch(actions.fetchLuke())
        expect(store.getActions()).toMatchSnapshot()
    })
})