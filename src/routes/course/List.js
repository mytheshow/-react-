import React from 'react';
import {connect} from 'react-redux';
import {Carousel,Icon,Button} from "antd";
import {Link} from 'react-router-dom';
import action from '../../store/action';

class List extends React.Component{
    constructor(props,context){
        super(props);
        this.state = {isLoading:false};
    }

    async componentDidMount(){
        let {queryBanner,bannerData,courseData,queryList} = this.props;
        if(!bannerData||bannerData.length===0){
            queryBanner();
        }
        if(courseData.data.length===0){
            queryList({});
        }
    }

    componentWillReceiveProps() {
        //路由重新渲染或者redux状态改变，this.props挂载着redux状态，所以也会改变
        //这句话的意思是当点击加载更多，dispatch派发结束后state改变，该函数会执行
        this.setState({isLoading:false});
    }

    queryType=()=>{
      let {courseType} = this.props,text='全部课程';
      switch (courseType) {
          case 'react':
              text='REACT框架开发';
              break;
          case 'vue':
              text='VUE框架开发';
              break;
          case 'xiaochengxu':
              text='小程序开发';
              break;
      }
      return text;
    };

    loadMore= ()=>{
        let {queryList,courseData,courseType} = this.props;
        //防止狂点加载更多
        if(this.state.isLoading) return;
        this.setState({isLoading:true});
        queryList({
            page:courseData.page+1,
            type:courseType,
            flag:'push'
        });

    };

    render() {
        let {bannerData,courseType,courseData} = this.props,
            {data} = courseData;
        return <div className='listBox' >

            {bannerData&&bannerData.length!==0?
                <Carousel autoplay>
                    {bannerData.map((item,index)=>{
                        let {name,pic} = item;
                        return <div key={index}>
                            <img src={pic} alt={name} />
                        </div>
                    })}
                </Carousel>:null
            }

            <div className='courseList'>
                <h2><Icon type='menu-fold' />{this.queryType()}</h2>
                {data && data.length !==0?<div>
                    <ul>
                        {data.map((item,index)=>{
                            let {name,pic,dec,id,time} = item;
                            return <li key={index}>
                                <Link to={{
                                    pathname:'/course/info',
                                    search:'?courseID='+id
                                }}>
                                    <h3>{name}</h3>
                                    <div className='content'>
                                        <div className='pic' >
                                            <img src={pic} alt={name}/>
                                        </div>
                                        <div className='desc'>
                                            <p>{dec}</p>
                                            <p>时间：{time}</p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        })}
                    </ul>
                    <Button type='dashed' onClick={this.loadMore} loading={this.state.isLoading} >加载更多</Button>
                </div>:'暂无数据'}
            </div>
        </div>;
    }
}

export default connect(state=>({...state.course}),action.course)(List);