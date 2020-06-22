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
  // componentDidMount(){
  //   const html = this.props.detail;
  //   console.log(html,'html')
  //   if(this.props.detail){
  //     const contentBlock = htmlToDraft(html);
  //     if (contentBlock) {
  //       const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  //       const editorState = EditorState.createWithContent(contentState);
  //       this.state = {
  //         editorState,
  //       };
  //     }
  //   }
  // }
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
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}
