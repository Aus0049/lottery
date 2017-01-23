/**
 * Created by Aus on 17/1/23.
 */
import React from 'react'

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