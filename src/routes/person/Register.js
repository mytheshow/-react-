import React from 'react';
import {connect} from 'react-redux';
import {Form, Icon, Button, Input, Row, Col, Modal} from 'antd';
import md5 from 'blueimp-md5';
import {register} from '../../api/person';
import action from '../../store/action';

const FormItem = Form.Item;

class Register extends React.Component{
    constructor(props,context){
        super(props,context);
    }

    handleSubmit = e =>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                values.password = md5(values.password);
                let result = await register({values});
                if(parseFloat(result.code)===0){
                    //修改容器里面的信息
                    this.props.queryBaseInfo();
                    this.props.history.push('/person/info');
                    return;
                }

                let errorTip = ()=>{
                    const modal = Modal.error({
                        title:'提示',
                        content:'登陆失败，请稍后重试'
                    });
                    setTimeout(()=>modal.destroy(),2000);
                };

                errorTip();
            }
        });
    };

    render() {
            const {getFieldDecorator} = this.props.form;
            const formItemLayout = {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 8 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 16 },
                }
            };
            return (<section  className='personLoginBox'>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <FormItem  label='用户名' >
                        {getFieldDecorator('name',{
                            rules:[
                                { required: true, message: '请输入用户名!'}
                            ]
                        })(<Input/>)}
                    </FormItem>
                    <FormItem label='邮箱' >
                        {getFieldDecorator('email',{
                            rules:[
                                { required: true, message: '请输入邮箱!'},
                                {type: 'email', message: 'The input is not valid E-mail!'}
                            ]
                        })(<Input/>)}
                    </FormItem>
                    <FormItem label='手机' >
                        {getFieldDecorator('phone',{
                            rules:[
                                { required: true, message: '请输入手机号!'}
                                ]
                        })(<Input/>)}
                    </FormItem>
                    <FormItem  label='密码' >
                        {getFieldDecorator('password',{
                            rules:[
                                { required: true, message: '请输入密码!'}
                            ]
                        })(<Input type='password' />)}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">立即注册</Button>
                    </FormItem>
                </Form>
            </section>)
        }

}

export default Form.create({ name: 'time_related_controls' })(connect(null,action.person)(Register));