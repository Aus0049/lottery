/**
 * Created by Aus on 17/2/6.
 */
import React from 'react'


class SwipeList extends React.Component {
    getFirstLetter (title) {
        return title.substr(0, 1);
    }
    render (){
        const {title, id, colorName, onDelete} = this.props;
        const FirstLetter = this.getFirstLetter(title);

        return (
            <li className="swipe-list" id={`swipe-list-right-${id}`}>
                <div className="face">
                    <div className="user-head"><span className={colorName}>{FirstLetter}</span></div>
                    <div className="user-name">{title}</div>
                </div>
                <div className="delete-btn" onTouchTap={onDelete.bind(this, id)}>删除</div>
            </li>
        );
    }
}

export default SwipeList