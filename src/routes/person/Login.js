import React from 'react';
import {connect} from 'react-redux';
import {Form, Icon, Input, Button,Modal} from 'antd';
import {Link} from 'react-router-dom';
import md5 from 'blueimp-md5';
import {login} from '../../api/person';
import action from '../../store/action';

class Login extends React.Component{
    constructor(props,context){
        super(props,context);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let errorTip = ()=>{
            const modal = Modal.error({
                title:'提示',
                content:'登陆失败，请稍后重试'
            });
            setTimeout(()=>modal.destroy(),2000);
        };
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
               let {userName,password} = values;
               password = md5(password);
               //第一种方法
               // login({
               //     name:userName,
               //     password:password
               // }).then(result=>{
               //     if(parseFloat(result.code)===0){
               //         this.props.history.go(-1);
               //         return;
               //     }
               // }).catch(err=>{
               //
               //     const modal = Modal.error({
               //         title:'提示',
               //         content:'登陆失败，请稍后重试'
               //     });
               //     setTimeout(()=>modal.destroy(),2000);
               // })
                //第二种方法async
                let result = await login({
                                 name:userName,
                                 password:password
                             });

                if(parseFloat(result.code)===0){
                            //修改容器里面的信息
                            this.props.queryBaseInfo();
                             this.props.history.go(-1);
                             return;
                         }
                errorTip();
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return <div className='personLoginBox'>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <Link to='/person/register'>register now!</Link>
                </Form.Item>
            </Form>
        </div>
    }

}

export default Form.create({ name: 'normal_login' })(connect(null,action.person)(Login));