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
import RaisedButton from 'material-ui/RaisedButton';
import Tools from '../../components/Tools';

class Play extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            stepNumber: 2,
            showAnimate: true, // 展示摇奖倒数动画
            resultData: [] // 结果数据 [{level: '', name: '', colorClass: '', prize: ''}]
        }
    }
    componentDidMount () {
        let obj = $(".number");
        let father = $(".reciprocal-box");
        let this_ = this;
        this.getResultData();

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
                        setTimeout(function () {
                            this_.setState({showAnimate: false, stepNumber: 3});
                        }, 1000);
                    }, 1000);
                }, 1000);
            }
        }, 50);
    }
    getResultData () {
        let userList = Tools.ResolveStorageData("userList");
        let prizeList = Tools.ResolveStorageData("prizeList");
        // 选出username
        let nameList =  [];
        // 获奖名字list
        let hasPrizeNameList = [];

        for(let i of userList){
            nameList.push(i.title);
        }

        let resultData = [];

        for(let item of prizeList){
            let level = item.level;
            let prizeNumber = item.number;
            let prizeDescription = item.description;

            for(let j = 0; j < prizeNumber; j++){
                // 选出一个随机中奖者
                let user = this.getNoRepeatRandomNumberFromArray(nameList, hasPrizeNameList);
                hasPrizeNameList.push(user);
                // 制作数据
                let colorName = this.getColorClassByName(user, userList);
                resultData.push({level: level, name: user, colorName: colorName, prize: prizeDescription});
            }
        }

        this.setState({
            resultData: resultData
        });
    }
    getColorClassByName (name, userList) {
        // 根据name 选出userList中 name那条数据的className
        for(let i of userList){
            if(i.title == name){
                return i.colorName;
            }
        }
    }
    getNoRepeatRandomNumberFromArray (originalArray, usedArray) {
        // 从俩个参数的差级中选出一个随机数
        usedArray = new Set([...usedArray]);
        // 差集
        let difference = new Set(originalArray.filter(x => !usedArray.has(x)));
        //
        difference = [...difference];
        let result = difference[Math.floor(Math.random() * difference.length)];

        return result;
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
        let resultData = this.state.resultData;
        let DOM = [];

        if(showAnimate || resultData.length == 0){
            return DOM;
        }

        // levelSet
        let levelSet = new Set();

        for(let i in resultData){
            levelSet.add(i.level);
        }

        let currentLevel;
        let dataDOM = [];
        let keyLevelCount = 0;
        let keyCount = 0;

        for(let i of resultData){
            if(i.level != currentLevel){
                dataDOM.push(
                    <li className="level" key={keyLevelCount}>{i.level}</li>
                );
                currentLevel = i.level;
                keyLevelCount++;
            }

            dataDOM.push(
                <li className="li" key={`li-${keyCount}`}>
                    <div className="head-box">
                        <span className={`head ${i.colorName}`}>{i.name.substr(0,1)}</span>
                    </div>
                    <div className="title">{i.name}</div>
                    <div className="prize">{i.prize}</div>
                </li>
            );
            keyCount++;
        }

        // 生成结果
        DOM.push(
            <div className="result-box" key="result-box">
                <ul className="list">
                    {dataDOM}
                </ul>
                <div className="go-index" key="index-btn">
                    <RaisedButton label="返回首页" secondary={true} fullWidth={true} href="/" />
                </div>
            </div>
        );

        return DOM;
    }
    render () {
        const stepNumber = this.state.stepNumber;
        const animateDOM = this.getAnimateDOM();
        const resultList = this.getResultListDOM();
        return (
            <MuiThemeProvider muiTheme={getMuiTheme({})}>
                <div className="classic-play-box">
                    <Stepper activeStep={stepNumber}>
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
