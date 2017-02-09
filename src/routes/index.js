/**
 * Created by Aus on 17/1/23.
 */
import Layout from '../layouts/index'
import Home from '../containers/Home'
import UserList from '../containers/Classic/UserList'
import SetPool from '../containers/Classic/SetPool'
import ClassicPlay from '../containers/Classic/Play'

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
            path: 'classic',
            childRoutes: [
                {
                    path: 'user-list',
                    component: UserList
                },
                {
                    path: 'set-pool',
                    component: SetPool
                },
                {
                    path: 'play',
                    component: ClassicPlay
                }
            ]
        }
    ]
})

export default createRoutes