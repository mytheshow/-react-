import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'antd';
import Qs from 'qs';
import {queryInfo,addShopCart,removeShopCart} from '../../api/course';
import action from '../../store/action';

class Info extends React.Component{
    constructor(props,context){
        super(props);
        this.state={
          data:null,
          isShop:-1 //-1还没有加入到购物车 0已经加入未支付 1已支付
        };
    }

    async componentDidMount(){
        let {location:{search}} = this.props,
            {courseID=0} = Qs.parse(search.substr(1))||{};
        this.courseId = courseID;//挂在到类上,为了在其他方法中也能调用
        let result = await queryInfo(courseID);
        if(parseFloat(result.code)===0){
            let {pay,unpay}=this.props.shopCart,isShop = -1;
            //未支付，如果能找到就设置isShop为0
            let unpayFind = unpay.find(item=>parseFloat(item.id)===parseFloat(courseID));
            if(unpayFind){isShop=0;}
            //已支付
            let payFind = pay.find(item=>parseFloat(item.id)===parseFloat(courseID));
            if(payFind){isShop=1;}
            this.setState({
                data:result.data,
                isShop
            });
        }
    }

    render() {
        let {data} = this.state;
        if(!data) return '';
        return <div className='baseInfo'>
            <video src='https://www.youtube.com/watch?v=NkjKld0SChg' controls preload='none' poster={data.pic} />
            <div className='content' >
                <h3>{data.name}</h3>
                <p>{data.dec}</p>
                <span>课程价格：{data.price}</span>
                {this.state.isShop!==1?<Button type={this.state.isShop===-1?'danger':'primary'} onClick={this.handleShopCart}>{this.state.isShop===-1?'加入购物车':'从购物车移除'}</Button>:''}
            </div>
        </div>;
    }
    handleShopCart = async ev =>{
         if(this.state.isShop === -1){
             let result = await addShopCart(this.courseId);
             if(parseFloat(result.code)===0){
                 this.props.queryUnpay();
                 this.setState({isShop:0});
             }

             return;
         }
        let result = await removeShopCart(this.courseId);
        if(parseFloat(result.code)===0){
            this.props.queryUnpay();
            this.setState({isShop:-1});
        }
    }
}

export default connect(state=>state.course,action.course)(Info);