/**
 * Created by Aus on 17/2/7.
 */
import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Tools from '../../components/Tools';


class SetPool extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            showDialog: false, // 是否显示对话框
            prizeList: [], // 奖品列表 [{level: "", number: "", description: ""}]
            levelText: "",
            levelTextError: "",
            prizeNumber: "",
            prizeNumberError: "",
            prizeDescription: "",
            prizeDescriptionError: ""
        }
    }
    componentDidMount () {
        Tools.SwipeListLeftRightWatcher();
    }
    handleOpen () {
        this.setState({showDialog: true});
    }
    handleClose () {
        this.setState({showDialog: false});
    }
    handleInput (keyName, e) {
        let obj = {};
        obj[keyName] = e.target.value;
        this.setState(obj);
    }
    handleCheckInput () {
        // 检查输入项是否合法 并报错

    }
    getDialogDOM () {
        const {showDialog, levelText, levelTextError, prizeNumber, prizeNumberError, prizeDescription, prizeDescriptionError} = this.state;

        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={this.handleClose.bind(this)}
            />,
            <FlatButton
                label="确定"
                primary={true}
                onTouchTap={this.handleCheckInput.bind(this)}
            />
        ];

        const DialogDOM = <Dialog
            title="添加奖池"
            actions={actions}
            modal={false}
            open={showDialog}
            className="add-dialog"
            onRequestClose={this.handleClose.bind(this)}
        >
            <TextField className="add-level-input" fullWidth={true} hintText="奖项名称 6个字以内" value={levelText} errorText={levelTextError} onChange={this.handleInput.bind(this, "levelText")}/>
            <TextField className="add-level-input" fullWidth={true} hintText="奖项数量" type="number" value={prizeNumber} errorText={prizeNumberError} onChange={this.handleInput.bind(this, "prizeNumber")}/>
            <TextField className="add-level-input" fullWidth={true} hintText="奖品描述 10字以内" value={prizeDescription} errorText={prizeDescriptionError} onChange={this.handleInput.bind(this, "prizeDescription")}/>
        </Dialog>;

        return DialogDOM;
    }
    render () {
        const DialogDOM = this.getDialogDOM();

        return (
            <MuiThemeProvider muiTheme={getMuiTheme({})}>
                <div className="set-pool-box">
                    <Stepper activeStep={1}>
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
                    <Chip className="alert-chip">当前人数4, 推荐一等奖1个二等奖1个</Chip>
                    <p className="prize-pool">奖品池</p>
                    <ul className="swipe-list-group">
                        <p className="no-list">暂无数据</p>
                    </ul>
                    <div className="add-list">
                        <RaisedButton label="添加奖项" primary={true} fullWidth={true} onTouchTap={this.handleOpen.bind(this)} />
                    </div>
                    {DialogDOM}
                </div>
            </MuiThemeProvider>
        )
    }
}

export default SetPool