import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    Input
} from 'antd';

const Item = Form.Item;

class ModifyForm extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        //将表单对象传递到父组件中
        this.props.setForm(this.props.form);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { category } = this.props;
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('categoryName',{
                            initialValue: category.name
                        })(
                            <Input placeholder="请输入分类名称"/>
                        )
                    }
                    
                </Item>
            </Form>
        );
    }
}

ModifyForm.propTypes = {
    category: PropTypes.object.isRequired,
    setForm: PropTypes.func.isRequired
}

const WrappedModifyForm = Form.create()(ModifyForm);
export default WrappedModifyForm;