import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'

import './styles/app.scss' // 引入样式
import './shared/base'

const store = createStore()

const render = () => {
    const routes = require('./routes/index').default(store)
    ReactDOM.render(
        <AppContainer store={store} routes={routes} />,
        document.getElementById('root')
    )
}

render()
