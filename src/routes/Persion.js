import React from 'react';
import {connect} from 'react-redux';
import {Switch,Route,Redirect} from 'react-router-dom';
import Login from './person/Login';
import Register from './person/Register';
import Tip from './person/Tip';
import Info from "./person/info";


import {checkLogin} from '../api/person';
import '../static/css/person.less';


class Person extends React.Component{
    constructor(props,context){
        super(props,context);

        this.state = {
            isLogin:false
        }
    }

    //验证是否登陆
    async componentWillMount(){
        let result = await checkLogin();
        let isLogin = parseFloat(result.code) === 0?true:false;
        this.setState({isLogin});

    }
    //属性更新的时候，路由渲染的location属性改变就会走这个函数，这个不会死循环
    //不能用componentWillUpdate，setState会重新渲染再次走componentWillUpdate造成死循环
    async componentWillReceiveProps(){
        let result = await checkLogin();
        let isLogin = parseFloat(result.code) === 0?true:false;
        this.setState({isLogin});
    }

    render() {
        return <section>
            <Switch>
                {/*这里不允许await异步，路由是不会等你返回结果的，路由是同步*/}
                {/*<Route path='/person/info' render={*/}
                    {/*async ()=>{*/}
                        {/*let result=await checkLogin();*/}
                        {/*if(parseFloat(result.code) === 0){*/}
                            {/*return <info/>*/}
                        {/*}*/}
                        {/*return <tip/>*/}
                    {/*}*/}
                {/*} />*/}
                {/*render返回的组件不受路由管控，所以<Info/>和<Tip/>不能用history属性,可以通过withRouter包起来解决*/}
                <Route path='/person/info' render={ ()=>{
                    if(this.state.isLogin){
                        return <Info/>
                    }
                    return <Tip/>
                }} />
                <Route path='/person/login' component={Login} />
                <Route path='/person/register' component={Register} />
                <Redirect from='/person' to='/person/info' />
            </Switch>
        </section>
    }
}

export default connect()(Person);