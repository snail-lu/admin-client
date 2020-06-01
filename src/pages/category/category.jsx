import React, { Component } from 'react';
import { Card,Button, Icon, Table, message, Modal } from 'antd';
import { reqCategoryList, reqUpdateCategory, reqAddCategory } from '../../api/index';
import LinkButton from '../../components/link-button/link-button';
import AddForm from './add-form.jsx';
import ModifyForm from './modify-form.jsx';

class Category extends Component {
  columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      width: 300,
      render: (category)=>(
        <span>
          <LinkButton onClick={()=>this.showModifyModal(category)} >修改分类</LinkButton>
          {
            category.parentId==='0'?<LinkButton onClick={()=>this.showSubCategorys(category)}>查看子分类</LinkButton>:null
          }
        </span>
      )
    },
  ];

  constructor(props){
    super(props);
    this.state={
      categorys: [],        //一级分类列表数据
      subCategorys: [],     //当前某一个一级分类对应的二级分类列表
      loading: false,       //是否显示数据加载图标
      parentId: '0',        //当前分类的父级id
      parentName:'',        //当前分类的父级分类名称
      showStatus: 0,        //弹窗显示标志 0：不显示  1：修改分类弹窗  2：添加分类弹窗
      addCategoryData:{     
        parentId:0,
        name:''
      },
      currentCategory:{},           //当前正在被修改的分类的信息
      form:{}                       //子组件传递过来的form对象，里面包含了要修改的分类的数据

    }
  }

  componentDidMount(){
    let { parentId } = this.state;
    this.getCategory(parentId);
  }

  componentDidUpdate(){

  }

  /**
   * 异步获取分类列表
   */
  getCategory = async (parentId) => {
    //发请求前，显示loading
    this.setState({loading:true})
    const result = await reqCategoryList(parentId);
    this.setState({loading:false})
    if(result.code===0){
      let target = parentId==='0'?'categorys':'subCategorys';
      this.setState({[target]:result.data})
    }else{
      message.error('获取分类列表失败')
    }
  }

  /**
   * 显示一级分类列表
   */
  showFirstCategory = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }

  /**
   * 显示二级分类列表
   */
  showSubCategorys = (category) => {
    this.setState({parentId:category._id,parentName:category.name},()=>{
      this.getCategory(this.state.parentId)
    })
  }

  /**
   * 显示修改弹窗 
   */
  showModifyModal(data){
    console.log(data)
    this.setState({
      showStatus: 1,
      currentCategory: data
    })
  }

  /**
   * 显示新增弹窗 
   */
  showAddModal = () => {
    this.setState({
      showStatus: 2
    })
  }

  /**
   * 弹窗取消操作
   */
  handleCancel = () => {
    this.setState({
      showStatus: 0
    })
  }

  /**
   * 输入框处理函数
   */
  handleInputChange = (e) => {
    let { addCategoryData } = this.state;
    addCategoryData.name = e.target.value;
    this.setState({addCategoryData})
  }

  /**
   * 添加分类弹窗确认操作
   */
  addCategory = async () => {
    let { form } = this.state;
    //获取数据
    let categoryName = form.getFieldValue('categoryName');
    let parentId = form.getFieldValue('parentId');
    form.validateFields(async (err, values) => {
      if(!err){
        let res = await reqAddCategory(categoryName,parentId);
        if(res.code===0){
          //隐藏弹窗
          this.setState({showStatus: 0})
          message.success('分类添加成功');
          //刷新列表
          this.getCategory(this.state.parentId);
        }else{
          message.warn(res.msg);
        }
      }
    })
    // if(categoryName.trim().length>0){
      
    // }
  }

  /**
   * 修改分类弹窗确认操作
   */
  modifyCategory = async () => {
    let { currentCategory,form } = this.state;

    //获取数据
    let categoryName = form.getFieldValue('categoryName');
    let categoryId = currentCategory._id;

    //发送修改请求
    let res = await reqUpdateCategory(categoryId,categoryName);

    //处理请求结果
    if(res.code===0){
      this.setState({showStatus:0});
      message.success('分类修改成功');
      this.getCategory(this.state.parentId);
    }
  }

  render() {
    const {parentId,parentName,categorys,subCategorys} = this.state;
    const title = parentId === '0'?'一级分类列表':(
      <span>
        <LinkButton onClick={this.showFirstCategory}>一级分类列表</LinkButton>
        <Icon type='right' style={{marginRight: 5}}/>
        <span>{parentName}</span>
      </span>
    )
    const extra = (<Button type="primary" onClick={this.showAddModal}><Icon type='plus'></Icon>添加</Button>);
    return (
        <div>
            <Card title={title} extra={extra}>
              <Table 
                bordered
                rowKey="_id"
                dataSource={parentId==='0'?categorys:subCategorys} 
                loading={this.state.loading}
                columns={this.columns}
                pagination={{defaultPageSize:6,showQuickJumper:true}}
              />

              <Modal
                title="修改分类"
                cancelText='取消'
                okText='确定'
                visible={this.state.showStatus===1}
                onOk={this.modifyCategory}
                onCancel={this.handleCancel}
                destroyOnClose
              >
                <ModifyForm category={this.state.currentCategory} setForm={(form)=>{this.setState({form})}}/>
              </Modal>
              <Modal
                title="添加分类"
                cancelText='取消'
                okText='确定'
                visible={this.state.showStatus===2}
                onOk={()=>this.addCategory()}
                onCancel={this.handleCancel}
                destroyOnClose
              >
                <AddForm setForm={(form)=>{this.setState({form})}}/>
              </Modal>
            </Card>
        </div>
    );
  }
}

export default Category;

