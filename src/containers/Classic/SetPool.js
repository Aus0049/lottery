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
import Tools from '../../components/Tools';


class SetPool extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount () {
        Tools.SwipeListLeftRightWatcher();
    }
    render () {
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
                        <li className="swipe-list">
                            <div className="face prize-list">
                                <span className="one-third">一等奖</span>
                                <span className="one-third">一个</span>
                                <span className="one-third">MacBook Air一台</span>
                            </div>
                            <div className="delete-btn">删除</div>
                            <div className="top-btn">置顶</div>
                        </li>
                    </ul>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default SetPool