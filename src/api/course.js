import axios from './index';

export function queryBanner(){
    //return axios.get('/course/banner')
    return {
        code:0,
        msg:'xxx',
        data:[
            {
                'id':999,
                'name':'react开发第999讲',
                'pic':'http://localhost:3000/assets/100.jpg',
                'date':'2018-01-01',
                'address':'珠峰302',
                'time':'1小时',
                'dec':'aaaaaaaaaaaaaa',
                'price':3000,
                'type':'react'
            },
            {
                'id':999,
                'name':'react开发第1000讲',
                'pic':'http://localhost:3000/assets/101.jpg',
                'date':'2018-01-01',
                'address':'珠峰303',
                'time':'1小时',
                'dec':'aaaaaaaaaaaaaa',
                'price':3001,
                'type':'react'
            },
            {
                'id':999,
                'name':'react开发第1001讲',
                'pic':'http://localhost:3000/assets/102.jpg',
                'date':'2018-01-01',
                'address':'珠峰304',
                'time':'1小时',
                'dec':'aaaaaaaaaaaaaa',
                'price':3002,
                'type':'react'
            }
        ]
    }
}

export function queryList(payload) {

    // return axios.get('/course/list',{
    //     params:{
    //         payload
    //     }
    // })

    return {
        code:0,
        msg:'xxx',
        data:[
        {
            'id':999,
            'name':'react开发第999讲',
            'pic':'http://localhost:3000/assets/100.jpg',
            'date':'2018-01-01',
            'address':'珠峰302',
            'time':'1小时',
            'dec':'aaaaaaaaaaaaaa',
            'price':3000,
            'type':'react'
        },
        {
            'id':998,
            'name':'react开发第1000讲',
            'pic':'http://localhost:3000/assets/101.jpg',
            'date':'2018-01-01',
            'address':'珠峰303',
            'time':'1小时',
            'dec':'aaaaaaaaaaaaaa',
            'price':3001,
            'type':'react'
        },
        {
            'id':997,
            'name':'react开发第1001讲',
            'pic':'http://localhost:3000/assets/102.jpg',
            'date':'2018-01-01',
            'address':'珠峰304',
            'time':'1小时',
            'dec':'aaaaaaaaaaaaaa',
            'price':3002,
            'type':'react'
        }
    ]
    }
}

export function queryInfo(courseID) {
    // return axios.get('/course/info',{
    //     params:{
    //         courseID
    //     }
    // });
    return {
        code:0,
        data:{
            'id':courseID,
            'name':'react开发第999讲',
            'pic':'http://localhost:3000/assets/100.jpg',
            'date':'2018-01-01',
            'address':'珠峰302',
            'time':'1小时',
            'dec':'的撒啊啊大撒大撒大撒大撒大撒去问驱蚊器武器恶趣味请问请问恶委屈恶趣味我去',
            'price':3000,
            'type':'react'
        }

    }
}

export function addShopCart(courseID) {
    // return axios.post('/store/add',{
    //     courseID
    // });
    return {
        code:0,
        msg:'加入购物车成功'
    }
}

export function removeShopCart(courseID) {
    // return axios.post('/store/remove',{
    //     courseID
    // });
    return{
        code:0,
        msg:'从购物车移除成功'
    }
}
//0未支付，1已支付
export function queryShopCart(state=0) {
    // return axios.get('/store/info',{
    //     params:{
    //         state
    //     }
    // });
    return {
        code:0,
        msg:'未支付或已支付的数据',
        data:[{id:999}]
    }
}