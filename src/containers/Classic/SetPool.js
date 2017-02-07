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

class SetPool extends React.Component {
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
                </div>
            </MuiThemeProvider>
        )
    }
}

export default SetPool