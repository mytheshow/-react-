import React from 'react';
import {connect} from 'react-redux';
import {Alert,Button} from 'antd';
import {withRouter} from 'react-router-dom';

class Tip extends React.Component{
    constructor(props,context){
        super(props,context);
    }

    render() {
        return <div>
            <Alert type='warning' message='未登录提醒' description='你还没有登陆哦~~' />
            <Button type='dashed' onClick={ev=>{
                this.props.history.push('/person/login')
            }} >立即登陆</Button>
            <Button type='dashed' onClick={ev=>{
                this.props.history.push('/person/login')
            }}>立即注册</Button>
        </div>
    }
}

export default withRouter(connect()(Tip));