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
import { addArticle, reqArticleInfo, saveArticle } from '../../../api/index';
import RichTextEditor from '../../../components/richTextEditor/richTextEditor';

const { Option } = Select;
const { TextArea } = Input;

class ArticlesEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            mode: '',
            articleInfo: null
        }
        this.editorRef =  React.createRef();
    }
    async componentDidMount(){
        let mode = this.props.location.pathname === '/articles/edit' ? 'edit' : 'add';
        let id = this.props.location.state&&this.props.location.state.id ? this.props.location.state.id : ""; 
        this.setState({ mode, id })
        if(id){
            let res = await reqArticleInfo(id);
            if(res.code===0&&res.data){
                this.setState({
                    articleInfo: res.data
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
                const { title,author } = values;
                const content = this.editorRef.current.getEditorState();
                let res;
                if(this.state.mode=='add'){
                    res = await addArticle(title, author, content);
                }else{
                    let { id } = this.state;
                    const username = memoryUtils.user.username;
                    res = await saveArticle(id, title, author, content)
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
        const { articleInfo } = this.state;
        let title, author, content;
        if(articleInfo){
            title = articleInfo.title;
            author = articleInfo.author;
            content = articleInfo.content;
        }
        const pageTitle = this.props.location.pathname=="/articles/add"?'新增页':'修改页';
        return (
            <div>
                <PageHeader
                    style={{
                    border: '1px solid rgb(235, 237, 240)',
                    padding: '5px',
                    fontSize: '5px'
                    }}
                    onBack={() => this.props.history.goBack()}
                    title={pageTitle}
                    subTitle=""
                />
                <Form labelCol={{span:4}} wrapperCol={{span: 16}} onSubmit={this.handleSubmit}>
                    <Form.Item label="标题">
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入文章标题!', whitespace: true }],
                            initialValue: title || ""
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="作者">
                        {getFieldDecorator('author', {
                            rules: [{ required: true, message: '请输入作者名!', whitespace: true }],
                            initialValue: author || ""
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="文章内容">
                        {/* {getFieldDecorator('content', {
                            rules: [{ required: true, message: '请输入配置值!', whitespace: true }],
                            initialValue: articleInfo&&articleInfo.content?articleInfo.content:""
                        })(<TextArea />)} */}
                        <RichTextEditor ref={this.editorRef} detail={content} />
                    </Form.Item>
                    {/* <Form.Item label="排序">
                        {getFieldDecorator('configSorts', {
                            // rules: [{ message: '请输入排序号!', whitespace: true }],
                            initialValue: articleInfo&&articleInfo.configSorts?articleInfo.configSorts:0
                        })(<Input />)}
                    </Form.Item> */}
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

export default Form.create()(ArticlesEdit);