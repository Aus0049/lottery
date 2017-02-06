/**
 * Created by Aus on 17/1/23.
 */
import Layout from '../layouts/index'
import Home from '../containers/Home'
import UserList from '../containers/Classic/UserList'

export const createRoutes = () => ({
    path: '/',
    component: Layout,
    indexRoute: { component: Home },
    childRoutes: [
        {
            path: 'index',
            component: Home
        },
        {
            path: 'classic/user-list',
            component: UserList
        }
    ]
})

export default createRoutes