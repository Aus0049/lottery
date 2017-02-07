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
            stepIndex: 0, // 当前进行的step数目
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
        } else if (value.length != value.match(/[A-Za-z0-9]/g).length) {
            // 用户名里特殊字符
            nameErrorText = ConstText.Classic.addNameIllegal;
        } else {
            let nameSet = new Set(nameList);

            if(nameSet.has(value)) {
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

        return ListDOM;
    }
    render () {
        const {stepIndex} = this.state;
        const DialogDOM = this.getDialogDOM();
        const ListDOM = this.getListDOM();

        return (
            <MuiThemeProvider muiTheme={getMuiTheme({})}>
                <div className="user-list-box">
                    <Stepper activeStep={stepIndex}>
                        <Step>
                            <StepLabel>填写列表</StepLabel>
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