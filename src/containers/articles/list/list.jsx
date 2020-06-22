import React, { Component } from 'react';
import { Card,Button, Icon, Table, message, Modal, Input, Divider } from 'antd';
import { reqArticlesList, reqUpdateCategory, reqAddCategory } from '../../../api/index';
import LinkButton from '../../../components/link-button/link-button';
import AddForm from '../edit/edit';
import { Link } from 'react-router-dom';
import './list.less';

const { Search } = Input;
class MenuList extends Component {
  columns = [
    {
      title: '文章标题',
      dataIndex: 'title',
      width: 200,
      ellipsis: true,
      align: 'center'
    },
    // {
    //   title: '文章内容',
    //   dataIndex: 'content',
    //   width: 200,
    //   ellipsis: true,
    //   align: 'center'
    // },
    {
      title: '作者',
      dataIndex: 'author',
      width: 100,
      ellipsis: true,
      align: 'center'
    },
    {
      title: '发布时间',
      dataIndex: 'publishTime',
      ellipsis: true,
      align: 'center'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      ellipsis: true,
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'articleStatus',
      width: 70,
      align: 'center',
      render: (status)=>(
        status?<Icon type="check-circle" /> : <Icon type="exclamation-circle" />
      )
    },
    {
      title: '操作',
      width: 100,
      align: 'center',
      render: (article)=>(
        <span>
          <Link to={{pathname:'/articles/edit',state:{id:article._id}}}>
            <Icon type="form" />
          </Link>
          <Divider type="vertical" />
          <LinkButton onClick={()=>this.showSubCategorys(article)}>
            <Icon type="delete" />
          </LinkButton>
        </span>
      )
    }
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
    this.getArticlesList(parentId);
  }

  componentDidUpdate(){

  }

  /**
   * 获取配置列表
   */
  getArticlesList = async (parentId) => {
    //发请求前，显示loading
    this.setState({ loading: true })
    const result = await reqArticlesList();
    this.setState({ loading: false })
    if(result.code===0){
      let target = parentId==='0'?'categorys':'subCategorys';
      this.setState({ [target]: result.data })
    }else{
      message.error('获取文章列表失败')
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
    const title = (
      <Search placeholder="关键词" onSearch={value => console.log(value)} enterButton style={{ width: 400}}/>
    )
    const extra = (<Link to="/articles/add"><Button type="primary"><Icon type='plus'></Icon>添加</Button></Link>);
    return (
        <div className="menu-config-list">
            <Card title={title} extra={extra}>
              <Table 
                bordered
                rowKey="_id"
                dataSource={parentId==='0'?categorys:subCategorys} 
                loading={this.state.loading}
                columns={this.columns}
                pagination={{defaultPageSize:6,showQuickJumper:true}}
                style={{fontSize:15}}
              />
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

export default MenuList;

