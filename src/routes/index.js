/**
 * Created by Aus on 17/1/23.
 */
import Layout from '../layouts/index'
import Home from '../containers/Home'
import ClassicUserList from '../containers/Classic/UserList'
import TurntableUserList from '../containers/Turntable/UserList'
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
                    component: ClassicUserList
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
        },
        {
            path: 'turntable',
            childRoutes: [
                {
                    path: 'user-list',
                    component: TurntableUserList
                }
            ]
        }
    ]
})

export default createRoutes