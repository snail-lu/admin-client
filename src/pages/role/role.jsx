import React, { Component } from 'react';
import memoryUtils from '../../utils/memoryUtils';
import Utils from '../../utils/index';
import { reqAdminList, reqDeleteAdmin, reqUpdateAdmin } from '../../api/index'
import { Table, Divider, Avatar, Card, message, Modal } from 'antd';
import LinkButton from '../../components/link-button/link-button';
import ModifyForm from './modify-form.jsx';
import './role.less';

class Role extends Component {

    //表格列配置
    columns = [
        {
          title: '用户名',
          dataIndex: 'username',
          render: text => <a>{text}</a>,
        },
        {
          title: '头像',
          dataIndex: 'avatar',
          render: avatar => <Avatar icon='user' src={avatar}/>
        },
        {
          title: '职级权限',
          dataIndex: 'adminRole',
        },
        {
          title: '邮箱',
          dataIndex: 'email',
        },
        {
          title: '操作',
          render: (text, record) => (
            <span>
              <LinkButton onClick={()=>this.modifyAdminInfo(record)}>修改</LinkButton>
              <Divider type="vertical" />
              <LinkButton onClick={()=>this.deleteAdminInfo(record)}>删除</LinkButton>
            </span>
          ),
        },
    ];
    constructor(props){
        super(props);
        this.state = {
            adminList: [],
            showModalBox: false,
            modalMode: '',        // 修改：'MODIFY'     删除：'DELETE'
            currentAdmin: null,
        }
    }

    /**
     * 获取管理员列表
     */
    getAdminList = async () => {
        let res = await reqAdminList();
        if(res.code==0){
            let adminList = this.transformAdminList(res.data);
            this.setState({
                adminList
            })
        }
    }

    /**
     * 列表项新增adminRole字段
     */
    transformAdminList = (list) => {
        return list.map((item)=>{
            item.adminRole = Utils.getAdminRole(item.adminLevel);
            return item;
        })
    }

    /**
     * 修改管理员信息
     */
    modifyAdminInfo = (admin) => {
        if(admin._id===memoryUtils.user._id || parseInt(memoryUtils.user.adminLevel)>parseInt(admin.adminLevel)){
            this.setState({ 
                modalMode: 'MODIFY',
                currentAdmin: JSON.parse(JSON.stringify(admin))
            })
        }else{
            message.warn('您的权限不足');
        }
    }

    /**
     * 删除管理员
     */
    deleteAdminInfo = (admin) => {
        if(parseInt(admin.adminLevel) >= parseInt(memoryUtils.user.adminLevel)){
            message.warn('您的权限不足');
        }else {
            this.setState({ 
                modalMode: 'DELETE',
                currentAdmin: admin
            })
        }
    }

    /**
     * 表单输入
     */
    /**
     * 对话框确认按钮回调
     */
    handleOk = async (e) => {
        let { form, currentAdmin, modalMode } = this.state;
        if(modalMode==='MODIFY'){
            let { username, email } = form.getFieldsValue(['username','email']);
            currentAdmin = {...currentAdmin,username,email};
            let updateRes = await reqUpdateAdmin(currentAdmin);
            if(updateRes.code===0){
                message.success(updateRes.msg);
                this.getAdminList();
            }else{
                message.error(updateRes.msg);
            }
            this.setState({
              modalMode: '',
              currentAdmin: null
            });
        }else if(modalMode==='DELETE'){
            let delRes = await reqDeleteAdmin(currentAdmin._id);
            if(delRes.code===0){
                message.success(delRes.msg);
                this.getAdminList();
            }
            this.setState({
                modalMode: '',
                currentAdmin: null
            });
        }
        

    };
    
    /**
     * 对话框取消按钮回调
     */
    handleCancel = e => {
        console.log(e);
        this.setState({
          modalMode: ''
        });
    };

    /**
     * 管理员信息修改
     */
    handleChangeAdmin = (admin) => {
        this.setState({
            currentAdmin: admin
        })
    }

    componentDidMount(){
        this.getAdminList();    
    }

    render() {
        const adminRole = Utils.getAdminRole(memoryUtils.user.adminLevel);
        const title = (<div>您是<a href="#">{ adminRole }</a></div>);
        const { adminList, modalMode,currentAdmin } = this.state;
        return (
            <Card title={title}>
                <Table columns={this.columns} dataSource={adminList} bordered rowKey={(record=>record._id)} />
                <Modal
                    title="用户权限修改"
                    okText="确认"
                    cancelText="取消"
                    visible={!!this.state.modalMode}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose>
                        {
                            modalMode==='MODIFY' ? <ModifyForm admin={currentAdmin} setForm={(form)=>this.setState({ form })} change={(admin)=>this.handleChangeAdmin(admin)}/> : (modalMode==='DELETE' ? <p>确认要删除管理员<a>{currentAdmin.username}</a>?</p> : null)
                        }
                </Modal>
            </Card>
        );
    }
}
export default Role;