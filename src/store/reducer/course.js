import * as TYPES from '../action-types';

let INIT_STATE = {
    bannerData: [],
    courseData:{
        total:1,
        limit:10,
        page:1,
        data:[]
    },
    courseType:'all',
    shopCart:{
        unpay:[],
        pay:[]
    }
};
export default function course(state=INIT_STATE,action) {
    state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case TYPES.COURSE_QUERY_BANNER:
            var {code,data} = action.bannerData;
            if(parseFloat(code)===0){
                state.bannerData = data;
            }
            break;
        case TYPES.COURSE_QUERY_LIST:
            var {result,flag,courseType} = action;
            state.courseType = courseType;
            if(parseFloat(result.code)===0){
                state.courseData.total=parseFloat(result.total);
                state.courseData.limit=parseFloat(result.limit);
                state.courseData.page=parseFloat(result.page);
                if(flag==='push'){
                    state.courseData.data=state.courseData.data.concat(result.data);
                }else {
                    state.courseData.data=result.data;
                }
            }
            break;
        case TYPES.COURSE_UNPAY:
            if(parseFloat(action.result.code)===0){
                state.shopCart.unpay = action.result.data;
            }
            break;
        case TYPES.COURSE_PAY:
            if(parseFloat(action.result.code)===0){
                state.shopCart.pay = action.result.data;
            }
            break;
    }
    return state;
}