import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Info from './course/Info';
import List from './course/List';
import '../static/css/course.less';

class Home extends React.Component{
    constructor(props,context){
        super(props);
    }

    render() {
        return <section className='courseBox' >
            <Switch>
                <Route path='/course' exact component={List} />
                <Route path='/course/info' component={Info} />
            </Switch>
        </section>
    }
}

export default Home;