/**
 * Created by Aus on 17/2/6.
 */
import React from 'react'


class SwipeList extends React.Component {
    getFirstLetter (title) {
        return title.substr(0, 1);
    }
    getHeadClassName () {
        const classNamePool = ["red900", "red500", "red300", "purple900", "purple500", "purple300", "blue900", "blue500", "blue300", "green900", "green500", "green300", "yellow900", "yellow500", "yellow300"];
        return classNamePool[Math.floor(Math.random() * classNamePool.length)];
    }
    render (){
        const {title, id, onDelete} = this.props;
        const FirstLetter = this.getFirstLetter(title);
        const HeadClassName = this.getHeadClassName();

        return (
            <li className="swipe-list">
                <div className="face">
                    <div className="user-head"><span className={HeadClassName}>{FirstLetter}</span></div>
                    <div className="user-name">{title}</div>
                </div>
                <div className="delete-btn" onTouchTap={onDelete.bind(this, id)}>删除</div>
            </li>
        );
    }
}

export default SwipeList