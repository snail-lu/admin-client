import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import memoryUtils from '../../../utils/memoryUtils';
import {
    PageHeader,
    Form,
    Input,
    Select,
    Button,
    message,
} from 'antd';
import { addConfig, getConfigInfo, saveConfig } from '../../../services/index';

const { Option } = Select;
const { TextArea } = Input;

class MenuEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            mode: '',
            configInfo: null
        }
    }
    async componentDidMount(){
        let mode = this.props.location.pathname === '/menus/edit' ? 'edit' : 'add';
        let id = this.props.location.state&&this.props.location.state.id ? this.props.location.state.id : ""; 
        this.setState({ mode, id })
        if(id){
            let res = await getConfigInfo(id);
            if(res.code===0&&res.data){
                this.setState({
                    configInfo: res.data
                })
            }
            
        }
    }
    handleSubmit = (e) => {
        //阻止默认行为
        e.preventDefault();

        //获取表单对象
        const form = this.props.form;

        //对所有表单数据进行校验
        form.validateFieldsAndScroll(async (err, values) => {
            if(!err){
                const { configName,configKey,configValue,configSorts } = values;
                let res;
                if(this.state.mode=='add'){
                    res = await addConfig(configName,configKey,configValue,configSorts);
                }else{
                    let { id } = this.state;
                    const username = memoryUtils.user.username;
                    res = await saveConfig(id,configName,configKey,configValue,configSorts,username)
                }
                
                if(res.code===0){
                    message.success(res.msg,1)

                    //页面跳转
                    this.props.history.goBack();
                }else{
                    message.error(res.msg)
                }
                    
                
            }else{
                // console.log('验证失败',err)
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { configInfo } = this.state;
        const title = this.props.location.pathname=="/menus/add"?'新增页':'修改页';
        return (
            <div>
                <PageHeader
                    style={{
                    border: '1px solid rgb(235, 237, 240)',
                    padding: '5px',
                    fontSize: '5px'
                    }}
                    onBack={() => this.props.history.goBack()}
                    title={title}
                    subTitle=""
                />
                <Form labelCol={{span:4}} wrapperCol={{span: 16}} onSubmit={this.handleSubmit}>
                    <Form.Item label="配置名称">
                        {getFieldDecorator('configName', {
                            rules: [{ required: true, message: '请输入配置名称!', whitespace: true }],
                            initialValue: configInfo&&configInfo.configName?configInfo.configName:""
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="配置键">
                        {getFieldDecorator('configKey', {
                            rules: [{ required: true, message: '请输入配置键!', whitespace: true }],
                            initialValue: configInfo&&configInfo.configKey?configInfo.configKey:""
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="配置值">
                        {getFieldDecorator('configValue', {
                            rules: [{ required: true, message: '请输入配置值!', whitespace: true }],
                            initialValue: configInfo&&configInfo.configValue?configInfo.configValue:""
                        })(<TextArea />)}
                    </Form.Item>
                    <Form.Item label="排序">
                        {getFieldDecorator('configSorts', {
                            // rules: [{ message: '请输入排序号!', whitespace: true }],
                            initialValue: configInfo&&configInfo.configSorts?configInfo.configSorts:0
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item wrapperCol={{
                        xs: {
                        span: 24,
                        offset: 0,
                        },
                        sm: {
                        span: 17,
                        offset: 7,
                        },
                    }}>
                        <Button type="default" onClick={()=>this.props.history.goBack()}>返回</Button>
                        <Button type="primary" style={{marginLeft:"20px"}} htmlType="submit">保存</Button>
                    </Form.Item>
                </Form>

            </div>
        )
    }
}

export default Form.create()(MenuEdit);