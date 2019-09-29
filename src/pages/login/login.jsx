import React, { Component } from 'react';
import './login.less';
import logo from '../../assets/images/logo.png';
import { Form, Icon, Input, Button, message} from 'antd'; 
import {reqLogin} from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import {Redirect} from 'react-router-dom';
import storageUtils from '../../utils/storageUtils';
/*   
 * 登陆的路由组件
 */
class Login extends Component {
    /**
     * 表单数据提交
     */
    handleSubmit = (e) => {
        //阻止默认行为
        e.preventDefault();

        //获取表单对象
        const form = this.props.form;

        //对所有表单数据进行校验
        form.validateFields(async (err, values) => {
            if(!err){
                const {username,password} = values;
                let res = await reqLogin(username,password);
                if(res.code===0){
                    message.success('登录成功',1)

                    //用户信息
                    const user = res.data;
                    memoryUtils.user = user;
                    storageUtils.saveUser(user);

                    //页面跳转
                    this.props.history.push('/admin');
                }else{
                    message.error(res.msg)
                }
                    
                
            }else{
                console.log('验证失败',err)
            }
        });
    }

    /**
     * 对密码进行自定义验证
     */
    validatePwd = (rule,value,callback) => {
        let pattern = /^[a-zA-Z0-9_]+$/;
        if(!value){
            callback('密码不能为空!');
        }else if(value.length<3){
            callback('密码长度不能小于3位')
        }else if(value.length>12){
            callback('密码长度不能大于12位')
        }else if(!pattern.test(value)){
            callback('密码只能包含字母，数字，或下划线')
        }else{
            callback();
        }
    }

    render() {
        const user = memoryUtils.user;
        if(user && user._id){
            return <Redirect to='/' />
        }
        const { getFieldDecorator } = this.props.form; 
        return (
            <div className="login">
                <header className='login-header'>
                    <img src={logo}/>
                    <h1>后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登陆</h2>
                    <div>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {
                                    getFieldDecorator('username',{
                                        rules: [
                                            { required: true, whitespace:true,message: '用户名不能为空!' },
                                            { min:4, max: 12, message: '用户名长度4-12位!' },
                                            {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名只能包含字母，数字，或下划线'}
                                        ],
                                    })(
                                        <Input
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="用户名"
                                            />
                                    )
                                } 
                            </Form.Item>
                            <Form.Item>
                                {
                                    getFieldDecorator('password',{
                                        rules: [
                                            { validator: this.validatePwd},
                                        ],
                                    })(
                                        <Input
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="密码"
                                            />
                                    )
                                }   
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </section>
            </div>
        );
    }
}


const LoginForm = Form.create()(Login);
export default LoginForm;