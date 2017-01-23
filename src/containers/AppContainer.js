/**
 * Created by Aus on 17/1/23.
 */
// 项目的根组件
import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'

class AppContainer extends Component {
    // 验证参数
    static propTypes = {
        routes : PropTypes.object.isRequired
    }

    // 禁止reRender
    shouldComponentUpdate () {
        return false
    }

    render () {
        const { routes } = this.props;

        return (
            <div style={{ height: '100%' }}>
                <Router history={browserHistory} children={routes} />
            </div>
        )
    }
}

export default AppContainer
