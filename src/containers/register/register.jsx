import React, { Component } from 'react';
import './register.less';
import {
    Form,
    Input,
    Upload,
    Select,
    Button,
    Icon,
    message
  } from 'antd';
import { reqRegister } from '../../services';
import memoryUtils from '../../utils/memoryUtils';
import Utils from '../../utils/index';
import { Redirect, Link } from 'react-router-dom';
import storageUtils from '../../utils/storageUtils';
import LoginLayout from '../../components/loginLayout/loginLayout';

const { Option } = Select;

/*   
 * 登陆的路由组件
 */
class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            adminLevel: "1",
            avatar: ''
        }
    }

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    handleChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            adminLevel: value
        })
    }

    /**
     * 表单数据提交
     */
    handleSubmit = (e) => {
        //阻止默认行为
        e.preventDefault();

        //获取表单对象
        const form = this.props.form;

        //对所有表单数据进行校验
        form.validateFieldsAndScroll(async (err, values) => {
            if(!err){
                const { username,password,email } = values;
                const { adminLevel,avatar } = this.state;
                let res = await reqRegister(username,password,adminLevel,email,avatar);
                if(res.code===0){
                    message.success(res.msg,1)

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

    //上传头像
    avatarChange = info => {
        if(info.file.originFileObj){
            Utils.getBase64(info.file.originFileObj, imageUrl => {
                this.setState({
                    avatar: imageUrl
                })
            })
        }
        

    };

    render() {
        const user = memoryUtils.user;
        if(user && user._id){
            return <Redirect to='/' />
        }
        const { getFieldDecorator } = this.props.form; 

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const { avatar } = this.state;
        const uploadButton = (
            <div>
              <Icon type='plus' />
              <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <LoginLayout>
                <section className="register-content">
                <h2>用户注册</h2>
                    <div>
                        <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item label="用户名" hasFeedback>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入用户名!', whitespace: true }],
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="密码" hasFeedback>
                                {getFieldDecorator('password', {
                                    rules: [
                                    {
                                        required: true,
                                        message: '请输入密码！',
                                    }
                                    ],
                                })(<Input.Password />)}
                            </Form.Item>
                            <Form.Item label="邮箱" hasFeedback>
                                {getFieldDecorator('email', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入邮箱!',
                                        },
                                        {
                                            type: 'email',
                                            message: '邮箱格式不正确!'
                                        }
                                    ],
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="职位权限">
                                <Select defaultValue={this.state.adminLevel} style={{ width: 120 }} onChange={this.handleChange}>
                                    <Option value="1">初级管理员</Option>
                                    <Option value="2">中级管理员</Option>
                                    <Option value="3">高级管理员</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="头像">
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    beforeUpload={Utils.beforeUpload}
                                    onChange={this.avatarChange}
                                    customRequest={()=>{}}
                                >
                                    {avatar ? <img src={avatar} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </Form.Item>
                            <Form.Item wrapperCol={{
                                xs: {
                                span: 24,
                                offset: 0,
                                },
                                sm: {
                                span: 10,
                                offset: 7,
                                },
                            }}>
                                <Button type="primary" block htmlType="submit">
                                    注册
                                </Button>
                                <div>
                                    已有账户，
                                    <Link to="/login">去登录</Link>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </section>
            </LoginLayout>
        );
    }
}


const RegisterForm = Form.create()(Register);
export default RegisterForm;