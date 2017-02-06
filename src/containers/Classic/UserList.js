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
import SwipeList from '../../components/SwipeList'
import Tools from '../../components/Tools'

class UserList extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            stepIndex: 0 // 当前进行的step数目
        }
    }
    componentDidMount () {
        Tools.SwipeListWatcher();
    }
    handleDeleteList (id) {
        console.log(id);
    }
    render () {
        const {stepIndex} = this.state;
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
                </div>
            </MuiThemeProvider>
        )
    }
}


export default UserList