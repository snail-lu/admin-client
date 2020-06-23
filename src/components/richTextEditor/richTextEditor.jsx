import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './richTextEditor.less';


export default class RichTextEditor extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      editorState: EditorState.createEmpty(),
    }

  }
  //props更新
  componentWillReceiveProps(props){
    if(props.detail){
      const contentBlock = htmlToDraft(props.detail);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks); 
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
          editorState,
        });
      }
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  getEditorState = () => draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));

  //图片上传
  uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          debugger;
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="rich-text-wrapper"
          editorClassName="rich-text-editor"
          onEditorStateChange={this.onEditorStateChange}
          editorStyle={{minHeight:'200px',lineHeight:'1'}}
          toolbar={{
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } }
          }}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}
