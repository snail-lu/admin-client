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
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor'

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
                this.props.form.setFieldsValue({
                    content: BraftEditor.createEditorState(res.data.content)
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
                const { title, author, content } = values;
                // const content = this.editorRef.current.getEditorState();
                let res;
                if(this.state.mode=='add'){
                    res = await addArticle(title, author, content.toRAW());
                }else{
                    let { id } = this.state;
                    const username = memoryUtils.user.username;
                    res = await saveArticle(id, title, author, content.toRAW())
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

    preview = () => {

        if (window.previewWindow) {
          window.previewWindow.close()
        }
    
        window.previewWindow = window.open()
        window.previewWindow.document.write(this.buildPreviewHtml())
        window.previewWindow.document.close()
    
      }
    
      buildPreviewHtml () {
        const form = this.props.form;
        const content = form.getFieldValue('content');
    
        return `
          <!Doctype html>
          <html>
            <head>
              <title>文章预览</title>
              <style>
                html,body{
                  height: 100%;
                  margin: 0;
                  padding: 0;
                  overflow: auto;
                  background-color: #f1f2f3;
                }
                .container{
                  box-sizing: border-box;
                  width: 1000px;
                  max-width: 100%;
                  min-height: 100%;
                  margin: 0 auto;
                  padding: 30px 20px;
                  overflow: hidden;
                  background-color: #fff;
                  border-right: solid 1px #eee;
                  border-left: solid 1px #eee;
                }
                .container img,
                .container audio,
                .container video{
                  max-width: 100%;
                  height: auto;
                }
                .container p{
                  white-space: pre-wrap;
                  min-height: 1em;
                }
                .container pre{
                  padding: 15px;
                  background-color: #f1f1f1;
                  border-radius: 5px;
                }
                .container blockquote{
                  margin: 0;
                  padding: 15px;
                  background-color: #f1f1f1;
                  border-left: 3px solid #d1d1d1;
                }
              </style>
            </head>
            <body>
              <div class="container">${content.toHTML()}</div>
            </body>
          </html>
        `
    
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
        const extendControls = [
            {
              key: 'custom-button',
              type: 'button',
              text: '预览',
              onClick: this.preview
            }
          ]
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
                    {/* 使用react-draft-wysiwyg富文本编辑器 */}
                    {/* <Form.Item label="文章内容">
                        <RichTextEditor ref={this.editorRef} detail={content} />
                    </Form.Item> */}

                    {/* 使用braft-editor富文本编辑器---这个更好用 */}
                    <Form.Item label="文章正文">
                        {getFieldDecorator('content', {
                            validateTrigger: 'onBlur',
                            rules: [{
                                required: true,
                                validator: (_, value, callback) => {
                                if (value.isEmpty()) {
                                    callback('请输入正文内容')
                                } else {
                                    callback()
                                }
                                }
                            }],
                        })(
                            <BraftEditor
                                className="my-editor"
                                // controls={controls}
                                placeholder="请输入正文内容"
                                controlBarStyle={{border:'1px solid #ccc'}}
                                contentStyle={{border:'1px solid #ccc'}}
                                extendControls={extendControls}
                            />
                        )}
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