import * as TYPES from '../action-types';
import {queryBanner,queryList,queryShopCart} from '../../api/course';

let course = {
    queryBanner(){
        return {
            type:TYPES.COURSE_QUERY_BANNER,
            bannerData:queryBanner()
        }
    },
    queryList(payload){
        let {limit=10,page=1,type='all',flag='push'} = payload;
        //另一种派发方式,因为上一种要想派发两次参数必须为payload
        return async dispatch=>{
            let result = await queryList({
                limit,
                page,
                type
            });
            dispatch({
                type:TYPES.COURSE_QUERY_LIST,
                result,
                flag,
                courseType:type
            });
        }
    },
    queryUnpay(){
        return async dispatch => {
            let result = await queryShopCart(0);
            dispatch({
                type:TYPES.COURSE_UNPAY,
                result
            });
        }
    },
    querypay(){
        return async dispatch => {
            let result = await queryShopCart(1);
            dispatch({
                type:TYPES.COURSE_PAY,
                result
            });
        }
    }
};

export default course;