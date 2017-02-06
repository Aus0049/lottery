/**
 * Created by Aus on 17/1/23.
 */
import React from 'react'
import '../static/css/reset.css'
import '../static/css/animate.css'
import '../static/scss/index.scss'
import '../static/plugins/icon/font-awesome.css'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
//import '../static/plugins/firework/jquery.fireworks'

class Layout extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            skin: 0
        }
    }
    componentDidMount () {
    }
    render () {
        return (
            <div className="wrap" id={`skin-${this.state.skin}`}>
                {this.props.children}
            </div>
        )
    }
}

export default Layout