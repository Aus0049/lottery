/**
 * Created by Aus on 17/2/9.
 */
import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

class Play extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            showAnimate: false, // 展示摇奖倒数动画
            resultData: [] // 结果数据
        }
    }
    componentDidMount () {
        let obj = $(".number");
        let father = $(".reciprocal-box");
        let this_ = this;

        let timer = setInterval(function () {
            if(obj.length != 0){
                // 清掉循环器
                clearInterval(timer);
                // 开始动画
                setTimeout(function () {
                    obj.eq(0).addClass("hide");
                    obj.eq(1).removeClass("hide").addClass("play");
                    setTimeout(function () {
                        obj.eq(1).addClass("hide");
                        obj.eq(2).removeClass("hide").addClass("play");
                        this_.setState({showAnimate: false});
                    }, 1000);
                }, 1000);
            }
        }, 50);
    }
    getAnimateDOM () {
        let showAnimate = this.state.showAnimate;
        let DOM = [];

        if(!showAnimate){
            return DOM;
        }

        DOM.push(
            <div className="reciprocal-box" key="animate-box">
                <h1 className="number one play">3</h1>
                <h1 className="number two hide">2</h1>
                <h1 className="number three hide">1</h1>
            </div>
        );

        return DOM;
    }
    getResultListDOM () {
        let showAnimate = this.state.showAnimate;
        let DOM = [];

        if(showAnimate){
            return DOM;
        }

        DOM.push(
            <div className="result-box" key="result-box">
                <List>
                    <Subheader>Recent chats</Subheader>
                    <ListItem
                        primaryText="Brendan Lim"
                        leftAvatar={<div>123</div>}
                        rightIcon={<div>asd</div>}
                    />
                </List>
            </div>
        );

        return DOM;
    }
    render () {
        const animateDOM = this.getAnimateDOM();
        const resultList = this.getResultListDOM();
        return (
            <MuiThemeProvider muiTheme={getMuiTheme({})}>
                <div className="classic-play-box">
                    <Stepper activeStep={2}>
                        <Step>
                            <StepLabel>填写列表</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>设置奖池</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>开始抽奖</StepLabel>
                        </Step>
                    </Stepper>
                    {animateDOM}
                    {resultList}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Play
