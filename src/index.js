import React from 'react';
import ReactDOM,{render} from 'react-dom';
import {HashRouter,Switch,Route,Redirect} from 'react-router-dom';

import {Provider} from 'react-redux';
import store from './store/index';

import {LocaleProvider} from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';

import './static/css/reset.css';
import './static/css/common.less';

import NavTop from "./components/NavTop";
import NavBottom from "./components/NavBottom";
import Home from "./routes/Home";
import Mycourse from "./routes/Mycourse";
import Person from "./routes/Persion";

render(<Provider store={store} >
    <HashRouter>
        <LocaleProvider locale={zhCN}>
            <div>
                <NavTop/>
                <main className='container' >
                    <Switch>
                        <Route path='/course' component={Home} />
                        <Route path='/mycourse' component={Mycourse} />
                        <Route path='/person' component={Person} />
                        <Redirect to='/course' />
                    </Switch>
                </main>
                <NavBottom/>
            </div>
        </LocaleProvider>
    </HashRouter>
</Provider>,document.getElementById('root'));