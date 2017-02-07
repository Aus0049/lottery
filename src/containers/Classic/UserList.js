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
            showDialog: true, // 是否显示对话框
            addName: "" // 当前添加的用户名
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
        let addName = this.state.addName;
        // 检查name是否合法
        if($.trim(addName).length == 0){
          // 用户名输入为空

        }
    }
    handleOpen () {

    }
    handleClose () {

    }
    render () {
        const {stepIndex, showDialog, addName} = this.state;
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={this.handleClose.bind(this)}
            />,
            <FlatButton
                label="确定"
                primary={true}
                onTouchTap={this.handleClose.bind(this)}
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
                <TextField className="add-input" hintText="姓名10字以内" value={addName} onChange={this.handleChangeInput.bind(this)}/>
            </Dialog>;

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
                        <SwipeList key="1" title="zby11" id="1" onDelete={this.handleDeleteList} />
                        <SwipeList key="2" title="zby12" id="2" onDelete={this.handleDeleteList} />
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