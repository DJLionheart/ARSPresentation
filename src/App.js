import React from 'react'
import { connect } from 'react-redux'

import * as selectors from './redux/selectors'
import Luke from './assets/luke.png'

const App = ({ luke }) => {
    console.log(luke)
    return (
        <div>
            <h1>{luke.name}</h1>
            {luke && <img src={Luke} alt="luke skywalker" />}
        </div>
    )
}

const mapStateToProps = state => ({
    luke: selectors.selectLuke(state)
})

export default connect(mapStateToProps)(App);