/**
 * Created by Aus on 17/1/23.
 */
import React from 'react'
import {Link} from 'react-router'

class Home extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount () {
        //$('.firework-bg').fireworks({
        //    sound: false, // sound effect
        //    opacity: 0.9,
        //    width: '100%'
        //});
        $('#bg').particleground({
            dotColor: '#5cbdaa',
            lineColor: '#5cbdaa'
        });
        let i = 0;
        let timer = window.setInterval(function () {
            $(".list:eq("+i+")").addClass("flyInto");
            i++;
            if(i == 4){
                clearInterval(timer);
            }
        }, 100);
    }
    render () {
        return (
            <div className="home-container">
                <div className="top">
                    <h1>抽奖小程序</h1>
                    <div className="firework-bg" id="bg"></div>
                </div>
                <div className="content">
                    <div className="box">
                        <Link className="list color1" to=""><i className="fa fa-star-o"></i>标准模式</Link>
                        <Link className="list color2" to=""><i className="fa fa-dashboard"></i>转盘模式</Link>
                        <Link className="list color3" to=""><i className="fa fa-tasks"></i>老虎机模式</Link>
                        <Link className="list color4" to=""><i className="fa fa-money"></i>刮刮乐模式</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home