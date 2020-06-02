import React, { Component } from 'react';
import { Form, Input, Select, Upload, Icon, Button } from 'antd';

const { Option } = Select;
class ModifyForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            admin: null
        }
    }
    componentDidMount(){
        this.props.setForm(this.props.form,{});
        this.setState({
            admin: this.props.admin
        })
    }

    handleChange = value => {
        let { admin } = this.state;
        admin.adminLevel = value;
        this.setState({
            admin
        })
        this.props.change(admin)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { admin } = this.state;
        return (
            <Form labelCol={{span:4}} wrapperCol={{span: 20}}>
                <Form.Item label="用户名" hasFeedback>
                    {getFieldDecorator('username', {
                        initialValue: admin ? admin.username : '',
                        rules: [{ required: true, message: '请输入用户名!', whitespace: true }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="邮箱" hasFeedback>
                    {getFieldDecorator('email', {
                        initialValue: admin ? admin.email : '',
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
                    <Select value={admin?admin.adminLevel:'1'} style={{ width: 120 }} onChange={this.handleChange}>
                        <Option value="1">初级管理员</Option>
                        <Option value="2">中级管理员</Option>
                        <Option value="3">高级管理员</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="头像">
                    <Upload>
                        <Button>
                            <Icon type="upload" /> Upload
                        </Button>
                    </Upload>
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(ModifyForm);
