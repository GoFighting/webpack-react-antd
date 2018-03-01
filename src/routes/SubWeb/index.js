import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path: 'subWeb',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const container = require('./containers').default
            const reducer = require('./reducers').default
            injectReducer(store, {
                key: 'subWeb',
                reducer
            })
            cb(null, container)
        }, 'subWeb')
    }
})