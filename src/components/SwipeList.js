/**
 * Created by Aus on 17/2/6.
 */
import React from 'react'


class SwipeList extends React.Component {
    render (){
        const {title, id, onDelete} = this.props;
        return (
            <li className="swipe-list">
                <div className="face">
                    <div className="user-head"><span>z</span></div>
                    <div className="user-name">{title}</div>
                </div>
                <div className="delete-btn" onTouchTap={onDelete.bind(this, id)}>删除</div>
            </li>
        );
    }
}

export default SwipeList