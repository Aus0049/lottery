/**
 * Created by Aus on 17/1/23.
 */
import Layout from '../layouts/index'
import Home from '../containers/Home'

export const createRoutes = () => ({
    path: '/',
    component: Layout,
    indexRoute: { component: Home }
})