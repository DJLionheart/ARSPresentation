import fetch from '../utils/fetch'

export const setLuke = (data) => ({
    type: types.LUKE,
    payload: data
})

export const fetchLuke = () =>
    async (disaptch) => {
        const response = await disaptch(fetch.get('https://swapi.co/api/people/1'))
        console.log('hit', response)
        disaptch(setLuke(response))
    }

export const types = {
    LUKE: 'LUKE'
}