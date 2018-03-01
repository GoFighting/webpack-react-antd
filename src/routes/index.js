import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import SubWeb from './SubWeb'

const createRoutes = (store) => ({
    path: '/',
    component: CoreLayout,
    indexRoute: Home,
    childRoutes: [
        SubWeb(store)
    ]
})
export default createRoutes
