/**
 * Created by Aus on 17/2/6.
 */
import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SwipeList from '../../components/SwipeList'
import Tools from '../../components/Tools';
import ConstText from '../../components/ConstText';

class UserList extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            showDialog: false, // 是否显示对话框
            nameList: [], // 添加的姓名列表 [{className: "red500", title: "123"}]
            addName: "", // 当前添加的用户名
            nameErrorText: "" // 添加姓名报错信息
        }
    }
    componentDidMount () {
        Tools.SwipeListWatcher();
    }
    handleDeleteList (id) {
        console.log(id);
    }
    handleChangeInput (e) {
        let value = e.target.value;
        if(value == ""){
            this.setState({addName: value, nameErrorText: ""});
            return;
        }

        this.setState({addName: value});
    }
    handleCheckAddName () {
        let {nameList, addName} = this.state;
        let nameErrorText = "";
        let value = $.trim(addName);
        let this_ = this;

        // 检查name是否合法
        if(value.length == 0){
            // 用户名输入为空
            nameErrorText = ConstText.Classic.addNameNull;
        } else if (value.length > 10) {
            // 用户名超过长度
            nameErrorText = ConstText.Classic.addNameLong;
        } else if (/[`~!@#$^&*()=|{}':;',\[\].<>\/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]/.test(value)) {
            // 用户名里特殊字符
            nameErrorText = ConstText.Classic.addNameIllegal;
        } else {
            // 数组中的结构较复杂 不用set去重
            let isRepeat = false;

            for(let i = 0; i < nameList.length; i++){
                if(value == nameList[i].title){
                    isRepeat = true;
                }
            }

            if(isRepeat == true) {
                // 姓名去重
                nameErrorText = ConstText.Classic.addNameRepeat;
            } else {
                nameErrorText = "";
            }
        }

        if(nameErrorText != ""){
            this.setState({nameErrorText: nameErrorText});
            return;
        }

        // 姓名添加通过
        nameList.push({colorName: this_.getHeadClassName(), title: value});
        this.setState({
            showDialog: false,
            nameList: nameList,
            addName: "",
            nameErrorText: ""
        });
    }
    handleOpen () {
        this.setState({showDialog: true});
    }
    handleClose () {
        this.setState({showDialog: false});
    }
    handleNext () {

    }
    getHeadClassName () {
        const classNamePool = ["red900", "red500", "red300", "purple900", "purple500", "purple300", "blue900", "blue500", "blue300", "green900", "green500", "green300", "yellow900", "yellow500", "yellow300"];
        return classNamePool[Math.floor(Math.random() * classNamePool.length)];
    }
    getDialogDOM () {
        const {showDialog, addName, nameErrorText} = this.state;
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={this.handleClose.bind(this)}
            />,
            <FlatButton
                label="确定"
                primary={true}
                onTouchTap={this.handleCheckAddName.bind(this)}
            />
        ];
        const DialogDOM = <Dialog
            title="添加参与者姓名"
            actions={actions}
            modal={false}
            open={showDialog}
            className="add-dialog"
            onRequestClose={this.handleClose.bind(this)}
        >
            <TextField className="add-input" hintText="姓名10字以内" value={addName} errorText={nameErrorText} onChange={this.handleChangeInput.bind(this)}/>
        </Dialog>;

        return DialogDOM;
    }
    getListDOM () {
        let ListDOM = [];
        let this_ = this;
        let nameList = this.state.nameList;

        if(nameList.length == 0) {
            ListDOM = <p className="no-name">点击右下角添加参与者</p>;
        }

        for(let i = 0; i < nameList.length; i++){
            ListDOM.push(<SwipeList key={`s-${i}`} title={nameList[i].title} colorName={nameList[i].colorName} id={i} onDelete={this_.handleDeleteList.bind(this_)} />);
        }

        // 如果人数两个人以上 可以下一步抽奖
        if(ListDOM.length > 2){
            ListDOM.push(<RaisedButton className="go-next" key="next" label={`当前人数: ${ListDOM.length}, 下一步`} primary={true} href="/classic/set-pool"/>);
        }

        return ListDOM;
    }
    render () {
        const DialogDOM = this.getDialogDOM();
        const ListDOM = this.getListDOM();

        return (
            <MuiThemeProvider muiTheme={getMuiTheme({})}>
                <div className="user-list-box">
                    <Stepper activeStep={0}>
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
                    <ul className="swipe-list-group">
                        {ListDOM}
                    </ul>
                    <FloatingActionButton className="add-btn" onTouchTap={this.handleOpen.bind(this)}>
                        <ContentAdd />
                    </FloatingActionButton>
                    {DialogDOM}
                </div>
            </MuiThemeProvider>
        )
    }
}


export default UserList