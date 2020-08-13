import React, { Component } from 'react';
import { Button, Table, Card, Input, Icon } from 'antd';

const { Search } = Input;

class User extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    columns = [
        {
            title: '用户名',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: '角色',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
            key: 'addmobileress',
        },
        {
            title: '所在地',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: () => <a>禁用</a>,
          },
      ];
      tableData = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ]
    render() {
        const title = (
            <Search placeholder="关键词" onSearch={value => console.log(value)} enterButton style={{ width: 400}}/>
          )
          const extra = (
                <div>
                    <Button type="primary"><Icon type='plus'></Icon>添加</Button> 
                    <Button type="primary"><Icon type='delete'></Icon>删除</Button> 
                    <Button type="primary"><Icon type='upload'></Icon>导入</Button> 
                    <Button type="primary"><Icon type='download'></Icon>导出</Button>
                </div>
            );
        return (
            <div className="activity-set-container">
                <Card title={title} extra={extra}>
              <Table 
                bordered
                rowKey="_id"
                dataSource={this.tableData} 
                loading={this.state.loading}
                columns={this.columns}
                style={{fontSize:15}}
              />
            </Card>
            </div>
        );
    }
}

export default User;