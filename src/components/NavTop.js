import React from 'react';
import {connect} from 'react-redux';
import action from '../store/action';
//受到路由管控
import {withRouter} from 'react-router-dom';
import {Icon} from 'antd';
//过渡动画
import Transition from 'react-transition-group/Transition';
//默认样式
const  defaultStyle = {
        //ease-in-out规定以慢速开始和结束的过渡效果
        transition:`opacity ${300}ms ease-in-out`,
        opacity:0,
    };
//过渡样式
const  transitionStyles = {
        entered:{opacity:1},
        exited: {opacity: 0}
    };

class NavTop extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state = {
          in:false
        };
        //每次刷新页面redux的数据会消失，要重新获取，放在nav是不管哪个页面都要执行
        this.props.queryUnpay();
        //this.props.querypay();

    }
handleClick = (ev)=>{
        let target = ev.target,
            tarTag = target.tagName;
        if(tarTag==='LI'){
            this.props.queryList({
                page:1,
                type:target.getAttribute('type'),
                flag:'replace'
            });
            this.setState({
                in:false
            })
        }
};
    render() {
        return <header className='headerNavBox'>
            {/*首页导航*/}
            <div className='homeBox'>
                <div className='baseBox clearfix' >
                    <h1 className='logo' >大鱼资源网</h1>
                    <Icon className='icon' type='bars' style={{
                    fontSize:'.6rem'
                    }} onClick={ev=>{
                        this.setState({
                            in:!this.state.in
                        })
                    }} />
                </div>
                {/*下拉条，过渡动画*/}
                <Transition
                    unmountOnExit={true}
                    timeout={0}//设置延迟时间，准确的说应该是动画出现和消失的第三阶段延迟时间，因为前两个阶段会立即执行
                    in={this.state.in} >
                    {
                        state => {
                            return <ul className='filterBox' style={{
                                ...defaultStyle,
                                //根据state的变化，过渡动画的透明度随着变化
                                ...transitionStyles[state]
                            }} onClick={this.handleClick}>
                                <li type="all" >全部课程</li>
                                <li type="react" >react课程</li>
                                <li type="vue">vue课程</li>
                                <li type="xiaochengxu">小程序课程</li>
                            </ul>
                        }
                    }
                </Transition>
            </div>
        </header>;
    }
}

export default withRouter(connect(null,action.course)(NavTop));