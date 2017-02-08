/**
 * Created by Aus on 17/2/8.
 */
/**
 * Created by Aus on 17/2/6.
 */
import React from 'react'


class SwipeListLeftRight extends React.Component {
    render (){
        const {leftText, middleText, rightText, onDelete, onTop, id} = this.props;

        return (
            <li className="swipe-list" id={`swipe-list-${id}`}>
                <div className="face prize-list">
                    <span className="one-third">{leftText}</span>
                    <span className="one-third">数量:{middleText}</span>
                    <span className="one-third">{rightText}</span>
                </div>
                <div className="delete-btn" onTouchTap={onDelete.bind(this, id)}>删除</div>
                <div className="top-btn" onTouchTap={onTop.bind(this, id)}>置顶</div>
            </li>
        );
    }
}

export default SwipeListLeftRight