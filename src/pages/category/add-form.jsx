import React, { Component } from 'react';
import {
    Form,
    Select,
    Input
} from 'antd';
import { reqCategoryList } from '../../api/index';

const Item = Form.Item;
const Option = Select.Option;

class AddForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            categoryList: []
        }
    }
    async componentDidMount(){
        this.props.setForm(this.props.form);
        let res = await reqCategoryList(0);
        if(res.code === 0){
            this.setState({
                categoryList: res.data
            })
        }
    }
    componentDidUpdate(){

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { categoryList } = this.state;
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('parentId',{
                            initialValue:'0',
                        })(
                            <Select>
                                <Option value="0">一级分类</Option>
                                {
                                    categoryList.map((category)=>{
                                        return <Option value={category._id} key={category._id}>{category.name}</Option>
                                    })
                                }
                                {/* <Option value="1">电脑</Option>
                                <Option value="2">图书</Option> */}
                            </Select>
                        )
                    }
                </Item>
                <Item>
                    {
                        getFieldDecorator('categoryName',{
                            initialValue: '',
                            rules: [{ required: true, message: '分类名称不能为空!',whitespace: true}]
                        })(
                            <Input placeholder="请输入分类名称"/>
                        )
                    }
                    
                </Item>
            </Form>
        );
    }
}

const WrappedAddForm = Form.create()(AddForm);
export default WrappedAddForm;